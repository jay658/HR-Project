import { Request, Response } from "express";

import EmployeeUser from "../../models/EmployeeUser";
import FacilityIssue from "../../models/FacilityIssue";

// Test Router
const testFacilityIssueRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit hr facility issue router');
  }catch(err){
    console.log(`There was an error in the hr facility issue test route: ${err}`);
  }
};

const getFacilityIssuesByApartment = async(req: Request, res: Response) => {
  try{
    const { page = '1' } = req.query
    const { apartmentId } = req.params
    const limit = 3
    const skip = (Number(page) - 1) * limit
    
    const facilityIssues = await FacilityIssue.find({ apartmentId }).limit(limit).skip(skip)

    res.json(facilityIssues)
  }catch(err){
    console.log(`There was an error getting facility issues by apartment id in the hr route: ${err}`);
  }
};

const deleteCommentOnFacilityIssue = async(req: Request, res: Response) => {
  try{
    const { commentId, facilityIssueId } = req.params
    
    const facilityIssue = await FacilityIssue.findByIdAndUpdate(
      facilityIssueId,
      { $pull: {
        comments: { _id: commentId }
        }
      },
      { new: true }
    )

    res.json('delete comment hr route')
  }catch(err){
    console.log(`There was an error deleting a comment in a facility issue in the hr route: ${err}`);
  }
}

const addCommentOnFacilityIssue = async(req: Request, res: Response) => {
  try{
    const { facilityIssueId } = req.params
    const { comment } = req.body
    
    const user = await EmployeeUser.findOne({username:'john.doe'})
    if(!user) throw Error('User not found')
    
    const facilityIssue = await FacilityIssue.findByIdAndUpdate(
      facilityIssueId,
      { $push: {
        comments: {  
            description: comment,
            createdBy: user._id
          }
        }
      },
      { new: true }
    )

    if(facilityIssue?.status === "open"){
      facilityIssue.status = "inProgress"
      await facilityIssue.save()
    }

    res.json(facilityIssue)
  }catch(err){
    console.log(`There was an error adding a comment to a facility issue in the hr route: ${err}`);
  }
}

export {
  testFacilityIssueRouter,
  getFacilityIssuesByApartment,
  deleteCommentOnFacilityIssue,
  addCommentOnFacilityIssue
}