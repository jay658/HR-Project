import express from 'express';
import facilityIssueRouter from './hrRouters/facilityIssueRouter';
import onboardingRouter from './hrRouters/onboardingRouter';
import userRouter from './hrRouters/userRouter';
<<<<<<< HEAD
import manageVisaRouter from './hrRouters/manageVisaRouter';
import hiringRouter from './hrRouters/hiringRouter';
=======
import hiringRouter from './hrRouters/hiringRouter';
import housingRouter from "./hrRouters/housingRouter";
>>>>>>> main

const hrRouter = express.Router();

hrRouter.use('/user', userRouter);
hrRouter.use('/onboarding', onboardingRouter)
hrRouter.use('/facilityIssue', facilityIssueRouter)
<<<<<<< HEAD
hrRouter.use('/manage-visa', manageVisaRouter)
hrRouter.use('/hiring', hiringRouter)
=======
hrRouter.use('/hiring', hiringRouter)
hrRouter.use("/housing", housingRouter);


export default hrRouter
>>>>>>> main

