import { Request, Response } from "express";

const testVisaRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit visa router');
  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`);
  }
}

export {
  testVisaRouter
}