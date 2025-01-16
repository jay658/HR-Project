import express from 'express';
import userRouter from './hrRouters/userRouter';

const hrRouter = express.Router();

hrRouter.use('/user', userRouter);

export default hrRouter