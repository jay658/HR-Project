import { Request, Response } from "express";

import Document from "../../models/Document";
import EmployeeUser from "../../models/EmployeeUser";
import PersonalInfo from "../../models/PersonalInfo";
import VisaApplication from "../../models/VisaApplication";
import mongoose from "mongoose";
import { uploadFileToAWS } from "../../utility/AWS/aws";

const testVisaRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit visa router');
  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`);
  }
}

// Get all exists visa
const getAllExistVisa = async (req : Request, res : Response) : Promise<any> => {
  const visaApplication = await VisaApplication.find({}).sort({createdAt:-1})
  return res.status(200).json(visaApplication)
}

// Create New Visa Application
const createVisa = async (req: Request, res: Response): Promise<any> => {
  try{
    const {username} = req.body

    const user = await EmployeeUser.findOne({username: username});

    if (!user) {
      return res.status(404).json({error : "User not found"})
    }

    const visa= await VisaApplication.findById(user.visaApplicationId)

    // Create new visa application
    if(!visa){
      const visa = await VisaApplication.create({userId : user._id})
      user.visaApplicationId = visa._id as mongoose.Types.ObjectId
      await user.save()
      
      return res.status(201).json({
        message: "New Visa application created successfully",
        visa: visa
      })
    }

    // Response if user already have visa before
    return res.status(200).json({
      message: "This visa is created before",
      visa: visa,
      user: user
    })

  }catch(err){
    console.log(`There was an error for getting status: ${err}`)
  }
};

// Get next documnet
const getNextRequiredDocument = async (req: Request, res: Response) : Promise<any> => {
  try{
    const { username } = req.query;

    // Find user
    const user = await EmployeeUser.findOne({username : username});
    if (!user) {
      return res.status(404).json({error : "User not found"})
    }
    // Get visa application
    const visa= await VisaApplication.findById(user.visaApplicationId)
    if (!visa) {
      return res.status(404).json({error : "No Visa application"})
    }

    // Get current document and their status
    // const currentDocuments = await visa.getCurrentDocuments();

    // Update next required document
    await visa.updateNextStep();

    // Get next Required Documnet
    const nextRequiredDoc = visa.getNextRequiredDocument();

    return res.status(200).json({
      nextRequiredDocument: nextRequiredDoc,
      applicationStatus: visa.nextStep
    })

  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`)
  }
}

// Upload new document
const uploadNewDocument = async (req : Request, res : Response) : Promise<any> => {
  try{
    const { username, type, fileKey, fileURL } = req.body;

    // Find user
    const user = await EmployeeUser.findOne({username : username});
    if (!user) {
      return res.status(404).json({error : "User not found"})
    }

    // Get visa application
    const visa= await VisaApplication.findById(user.visaApplicationId)
    if (!visa) {
      return res.status(404).json({error : "No Visa application"})
    }

    if(type !== visa.nextStep){
      return res.status(404).json({error: 'You have to upload file: ' + visa.nextStep})
    }

    // Get personal info
    const personalInfo = await PersonalInfo.findOne({userId:user._id})
    if(!personalInfo){
      return res.status(404).json({error : "Personal Info not found"})
    }

    // Find and delete any existing document of the same type for this user
    const existingDoc = await Document.findOne({ userId: user._id, type: type });

    if (existingDoc) {
      // Remove the document ID from personal info first
      if (personalInfo.employment?.documents) {
        personalInfo.employment.documents = personalInfo.employment.documents.filter(
          docId => !docId.equals(existingDoc._id)
        );
        await personalInfo.save();
      }
      
      // Then delete the document
      await Document.deleteOne({ _id: existingDoc._id });
    }

    // Create Document
    const document = await Document.create({userId: user._id, type: type, fileKey: fileKey, fileUrl:fileURL})

    // Save Document._id into Personal Info
    personalInfo.employment?.documents.push(document._id)

    await personalInfo.save()

    return res.status(200).json({personalInfo, document, user, visa})
    

  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`)
    return res.status(500).json({mssg:err})
  }

}

// Get Visa Status
const getVisaStatus = async (req : Request, res : Response) : Promise<any> => {
  const { username } = req.query;

  // Find user
  const user = await EmployeeUser.findOne({username : username});
  if (!user) {
    return res.status(404).json({error : "User not found"})
  }

  // Get personal info
  const personalInfo = await PersonalInfo.findOne({userId:user._id})
  if(!personalInfo){
    return res.status(404).json({error : "Personal Info not found"})
  }

  // Get all documents
  const documentIds = personalInfo.employment?.documents || [];
  const documents = await Document.find({
    _id: { $in: documentIds }
  });

  

  return res.status(200).json({documents})

}


// Check Visa Type from Personal Info
const getVisaType = async (req : Request, res : Response) : Promise<any> => {
  try{
    const { username } = req.query;

    // Find user
    const user = await EmployeeUser.findOne({username : username});
    if (!user) {
      return res.status(404).json({error : "User not found"})
    }

    // Get personal info
    const personalInfo = await PersonalInfo.findOne({userId:user._id})
    if(!personalInfo){
      return res.status(404).json({error : "Personal Info not found"})
    }

    if(!personalInfo.employment?.visaType){
      return res.status(404).json({error: "No Visa Type, please finish onboarding first"})
    }

    return res.status(200).json(personalInfo.employment.visaType)

  } catch (error){
    console.log("There was an error in checking Visa Type: ", error)
    return res.status(400).json({error})
  }

}

const getFileURL  = async (req : Request, res : Response) : Promise<any> => {
  try{
    const file = req.files?.file

    if(!file){
      return res.json(404).json({mssg: "No File Uploaded"})
    }
    if(Array.isArray(file)) {
      throw new Error('Only one file at a time')
    }
  
    const url = await uploadFileToAWS(file)

    return res.status(200).json({fileURL: url})

  }catch (error){
    console.log("There was an error in checking Visa Type: ", error)
    return res.status(400).json({error})
  }
 
}

export {
  testVisaRouter,
  getAllExistVisa,
  createVisa,
  getNextRequiredDocument,
  uploadNewDocument,
  getVisaStatus,
  getVisaType,
  getFileURL
}