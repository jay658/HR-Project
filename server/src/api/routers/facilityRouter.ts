import express, { Request, Response } from 'express';

import EmployeeUser from '../../models/EmployeeUser';
import FacilityIssue from '../../models/FacilityIssue';

const facilityIssueRouter = express.Router();

type IssueDetails = {
  title: string,
  description: string
}

facilityIssueRouter
  .get('/test', (_req, res) => {
    try{
      res.json('Successfully hit facility router');
    }catch(err){
      console.log(`There was an error in the facility test route: ${err}`);
    }
  })
  .get('/user', async (_req: Request, res: Response) => {
    try{
      // When auth is added, we should get the user info from the JWT token. For now, this is to simulate receiving a user id
      const testUser = await EmployeeUser.findOne({ username: 'john.doe' });
      const id = testUser?._id;

      const facilityIssues = await FacilityIssue.find({
        createdBy: id
      });
      
      res.json(facilityIssues);
    }catch(err){
      console.log(`There was an error fetching the facility reports for a specific user: ${err}`);
    }
  })
  .get('/issue/:id', async (req: Request, res: Response) => {
    try{
      const facilityIssueId = req.params.id;
      const facilityIssue = await FacilityIssue.findById(facilityIssueId);

      res.json(facilityIssue);
    }catch(err){
      console.log(`There was an error fetching a facility report by report id: ${err}`);
    }
  })
  .get('/apartment/:id', async (req: Request, res: Response) => {
    try{
      const apartmentId = req.params.id;
      const facilityIssues = await FacilityIssue.find({ apartmentId });
      
      res.json(facilityIssues);
    }catch(err){
      console.log(`There was an error fetching the facility reports by apartment id: ${err}`);
    }
  })
  .post('/create', async(req: Request, res: Response) => {
    try{
      // When auth is added, we should get the user info from the JWT token. For now, this is to simulate receiving a user id
      const testUser = await EmployeeUser.findOne({ username: 'john.doe' });
      const id = testUser?._id;
      const { issueDetails }: { issueDetails: IssueDetails} = req.body

      const facilityIssue = await FacilityIssue.create({
        ...issueDetails,
        createdBy: id,
        apartmentId: testUser?.apartmentId
      })

      res.status(201).send(facilityIssue)
    }catch(err){
      console.log(`There was an error creating a facility issue: ${err}`)
    }
  })
  .put('/comment/:facilityIssueId', async(req: Request, res: Response) => {
    try{
      const { facilityIssueId } = req.params;
      const { comment }: { comment: string } = req.body;
      // When auth is added, we should get the user info from the JWT token. For now, this is to simulate receiving a user id
      
      const testUser = await EmployeeUser.findOne({ username:'john.doe' });
      const id = testUser?._id;

      // Note: Because the issues are randomized in the seed, you should make sure to use facility issues (in the params) owned by the user when testing.
      const facilityIssue = await FacilityIssue.findById(facilityIssueId);
      
      if(!comment) res.status(400).json('Comment cannot be empty');
      else if(!facilityIssue) res.status(404).json('The facility issue cannot be found');
      else if(facilityIssue.status === 'closed') res.status(409).json('Cannot update because issue is closed');
      else if(!facilityIssue.createdBy.equals(id)) res.status(401).json('No permission to add a comment');
      else{
        const newComment = {
          description: comment,
          createdBy: id
        };
  
        facilityIssue.comments.push(newComment);
        await facilityIssue.save();
  
        res.json(facilityIssue);
      }
    }catch(err){
      console.log(`There was an error updating the facility issue: ${err}`);
    }
  })
  .put('/close/:facilityIssueId', async(req: Request, res: Response) => {
    try{
      const { facilityIssueId } = req.params;
      // When auth is added, we should get the user info from the JWT token. For now, this is to simulate receiving a user id
      const testUser = await EmployeeUser.findOne({ username:'john.doe' });
      const id = testUser?._id;

      // Note: Because the issues are randomized in the seed, you should make sure to use facility issues (in the params) owned by the user when testing.
      const facilityIssue = await FacilityIssue.findById(facilityIssueId);

      if(!facilityIssue) res.status(404).json('The facility issue was not found');
      else if (!facilityIssue.createdBy.equals(id)) res.status(401).json('No permission to close the facility issue');
      else{
        facilityIssue.status = 'closed';
        await facilityIssue.save();

        res.json(facilityIssue);
      };
    }catch(err){
      console.log(`There was an error when attempting to close the facility issue: ${err}`);
    }
  });

export default facilityIssueRouter;