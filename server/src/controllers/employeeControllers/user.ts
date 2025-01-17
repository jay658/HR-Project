import { Request, Response } from "express";

import EmployeeUser from "../../models/EmployeeUser";
import bcrypt from 'bcryptjs'
import config from "../../utility/configs";

// Test Router
const testUserRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit user router');
  }catch(err){
    console.log(`There was an error in the user test route: ${err}`);
  }
};

// Get all user 
const getAllUserRouter = async (req : Request, res : Response) : Promise<any> => {
  const users = await EmployeeUser.find({}).sort({createdAt:-1})
  return res.status(200).json(users)
}

// Register User
const registerRouter = async (req : Request, res : Response) : Promise<any> => {
  try{
  const {username, email, password} = req.body

  // Check if username exists
  const usernameExists = await EmployeeUser.findOne({username: username});
  if (usernameExists) {
    return res.status(409).json({error : "User Already Exists"})
  }

  // Check if email exists
  const emailExists = await EmployeeUser.findOne({email: email});
  if (emailExists) {
    return res.status(409).json({error : "Email Already Exists"})
  }

    //Create Hash Password
    const passwords = await bcrypt.hash(password, Number(config.SALT));

    //Create User
    const user = await EmployeeUser.create({username, email, password: passwords})

    //Response
    return res.status(201).json(user)

  }catch (error){
    return res.status(400).json({error})
  }


}


export {
  testUserRouter,
  getAllUserRouter,
  registerRouter
}