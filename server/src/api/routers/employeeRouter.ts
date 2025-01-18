import apartmentRouter from './employeeRouters/apartmentRouter';
import express from 'express';
import facilityIssueRouter from './employeeRouters/facilityRouter';
import onboardingRouter from './employeeRouters/onboardingRouter';
import personalInfoRouter from './employeeRouters/personalInfoRouter';
import userRouter from './employeeRouters/userRouter';
import visaRouter from './employeeRouters/visaRouter';

const employeeRouter = express.Router();

employeeRouter.use('/user', userRouter);
employeeRouter.use('/apartment', apartmentRouter);
employeeRouter.use('/onboarding', onboardingRouter);
employeeRouter.use('/visa', visaRouter);
employeeRouter.use('/facilityIssue', facilityIssueRouter);
employeeRouter.use('/personalInfo', personalInfoRouter);

export default employeeRouter