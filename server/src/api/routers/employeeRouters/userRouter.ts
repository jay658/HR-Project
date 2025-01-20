import { getAllUsers, getHousingForUser, login, registerUser, 
    testUserRouter, validateSession, validateRegistrationToken} 
from "../../../controllers/employeeControllers/user";

import express from "express";

const userRouter = express.Router();
userRouter.get('/test', testUserRouter);
userRouter.get('/getusers', getAllUsers);
userRouter.get("/housing", getHousingForUser);
userRouter.get('/validateSession', validateSession)
userRouter.post('/register/validate', validateRegistrationToken)
userRouter.post('/register', registerUser);
userRouter.post("/login", login);

export default userRouter;
