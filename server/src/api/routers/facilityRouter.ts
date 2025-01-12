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
      
      res.send(facilityIssues);
    }catch(err){
      console.log(`There was an error fetching the facility reports for a specific user: ${err}`);
    }
  })
  .get('/issue/:id', async (req: Request, res: Response) => {
    try{
      const facilityIssueId = req.params.id;
      const facilityIssue = await FacilityIssue.findById(facilityIssueId);

      res.send(facilityIssue);
    }catch(err){
      console.log(`There was an error fetching a facility report by report id: ${err}`);
    }
  })
  .get('/apartment/:id', async (req: Request, res: Response) => {
    try{
      const apartmentId = req.params.id;
      const facilityIssues = await FacilityIssue.find({ apartmentId });
      
      res.send(facilityIssues);
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

export default facilityIssueRouter;