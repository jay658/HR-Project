import express from "express";
import { testUserRouter } from "../../../controllers/hrControllers/user";

const userRouter = express.Router();

userRouter.get("/test", testUserRouter);

export default userRouter;
