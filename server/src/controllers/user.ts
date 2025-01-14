import { Request, Response } from "express";

const testUserRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit user router');
  }catch(err){
    console.log(`There was an error in the user test route: ${err}`);
  }
};

export {
  testUserRouter
}