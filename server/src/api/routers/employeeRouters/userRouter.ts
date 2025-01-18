import express, { Request } from "express";
import { getAllUsers, getHousingForUser, login, registerUser, testUserRouter } from "../../../controllers/employeeControllers/user";

import { authenticateToken } from "../../auth/authMiddleware";

const userRouter = express.Router();
userRouter.get('/test', testUserRouter);
userRouter.get('/getusers', getAllUsers);
userRouter.get("/housing", authenticateToken, getHousingForUser);
userRouter.post('/register', registerUser);
userRouter.post("/login", login);

export default userRouter;
