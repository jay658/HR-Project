import { Request, Response } from "express";

// Test Router
const testUserRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit hr user router');
  }catch(err){
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

export {
  testUserRouter
}