import { Request, Response } from "express";

import EmployeeUser from "../../models/EmployeeUser";

// Test Router
const testUserRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit hr user router');
  }catch(err){
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

const getEmployees = async(req: Request, res: Response) => {
  try{
    const employees = await EmployeeUser.find()

    res.json(employees)
  }catch(err){
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

export {
  testUserRouter,
  getEmployees
}