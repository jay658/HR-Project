import express from 'express'
import {Request, Response} from 'express'
import EmployeeUser from '../../models/EmployeeUser'
const bcrypt = require('bcrypt');

const userRouter = express.Router()

// Test API
userRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit user router')
  }catch(err){
    console.log(`There was an error in the user test route: ${err}`)
  }
})

// Get all users
userRouter.get('/allusers', async (req : Request, res : Response) : Promise<any> => {
  const users = await EmployeeUser.find({}).sort({createdAt:-1})
  return res.status(200).json(users)
})

// Register user
userRouter.post('/register', async (req : Request, res : Response) : Promise<any> => {
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
    const passwords = await bcrypt.hash(password, Number(process.env.SALT));

    //Create User
    const user = await EmployeeUser.create({username, email, password: passwords})

    //Response
    return res.status(201).json(user)

  }catch (error){
    return res.status(400).json({error})
  }


}) 

export default userRouter