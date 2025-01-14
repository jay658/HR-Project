import express from 'express'
import {Request, Response} from 'express'
import VisaApplication from '../../models/VisaApplication'
import EmployeeUser from '../../models/EmployeeUser'
import mongoose from 'mongoose'
import Document from '../../models/Document'
import PersonalInfo from '../../models/PersonalInfo'
const visaRouter = express.Router()

// Test the route
visaRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit visa router')
  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`)
  }
})

// Get all exists visa
visaRouter.get('/allvisa', async (req : Request, res : Response) : Promise<any> => {
  const visaApplication = await VisaApplication.find({}).sort({createdAt:-1})
  return res.status(200).json(visaApplication)
})

// Create New Visa Application
visaRouter.post('/create', async (req: Request, res: Response): Promise<any> => {
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
});

// Get next documnet
visaRouter.get('/next-document', async (req: Request, res: Response) : Promise<any> => {
  try{
    const { username } = req.body;

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
    const currentDocuments = await visa.getCurrentDocuments();

    // Update next required document
    await visa.updateNextStep();

    // Get next Required Documnet
    const nextRequiredDoc = visa.getNextRequiredDocument();

    return res.status(200).json({
      currentDocuments,
      nextRequiredDocument: nextRequiredDoc,
      applicationStatus: visa.nextStep
    })

  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`)
  }
})

// Upload new document
visaRouter.post('/upload', async (req : Request, res : Response) : Promise<any> => {
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

})

visaRouter.get('/status', async (req : Request, res : Response) : Promise<any> => {
  const { username } = req.body;

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

  const allDocuments = personalInfo.employment?.documents
  const resultArray = []
  if(allDocuments){
    for(let i of allDocuments){
      const singleDocument = []
      console.log(i)
      const document = await Document.findById(i)
      console.log(document?.status)
      singleDocument.push(i)
      singleDocument.push(document?.status)
      resultArray.push(singleDocument)
    }
  }
  

  return res.status(200).json({allDOcument : resultArray})

})

export default visaRouter