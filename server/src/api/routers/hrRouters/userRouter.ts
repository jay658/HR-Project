import {
  getEmployees,
  getEmployeeDetails,
  testUserRouter,
  login,
} from "../../../controllers/hrControllers/user";

import express from "express";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.get("/test", testUserRouter);
userRouter.get("/employees", getEmployees);
userRouter.get("/employees/:id", getEmployeeDetails);

export default userRouter;
