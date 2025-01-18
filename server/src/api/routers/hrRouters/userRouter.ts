import { getEmployees, testUserRouter } from '../../../controllers/hrControllers/user'

import express from "express";

const userRouter = express.Router();

userRouter.get('/test', testUserRouter)
userRouter.get('/employees', getEmployees)

export default userRouter;
