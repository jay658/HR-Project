import {
  getEmployees,
  testUserRouter,
  login,
} from "../../../controllers/hrControllers/user";

import express from "express";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.get("/test", testUserRouter);
userRouter.get("/employees", getEmployees);

export default userRouter;
