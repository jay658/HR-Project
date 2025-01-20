import {
  getAllEmployees,
  getDocuments,
  getEmployeeDetails,
  getEmployees,
  login,
  testUserRouter
} from "../../../controllers/hrControllers/user";

import express from 'express'

const userRouter = express.Router();

userRouter.get("/test", testUserRouter);
userRouter.get("/employees", getEmployees);
userRouter.get("/employees/:id", getEmployeeDetails);
userRouter.get('/documents', getDocuments)
userRouter.get('/getallusers', getAllEmployees)
userRouter.post("/login", login);

export default userRouter;
