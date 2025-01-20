import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import EmployeeUser from "../../../models/EmployeeUser";
import { authenticateToken } from '../../../middleware/authMiddleware';
import Apartment from "../../../models/Apartment";
import { getAllUsers, getHousingForUser, login, registerUser, testUserRouter, validateSession } from "../../../controllers/employeeControllers/user";

import express from "express";

const userRouter = express.Router();
userRouter.get('/test', testUserRouter);
userRouter.get('/getusers', getAllUsers);
userRouter.get("/housing", getHousingForUser);
userRouter.get('/validateSession', validateSession)
userRouter.post('/register', registerUser);
userRouter.post("/login", login);

export default userRouter;
