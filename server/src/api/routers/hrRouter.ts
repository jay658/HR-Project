import express from "express";
import facilityIssueRouter from "./hrRouters/facilityIssueRouter";
import onboardingRouter from "./hrRouters/onboardingRouter";
import userRouter from "./hrRouters/userRouter";
// import hiringRouter from './hrRouters/hiringRouter';

const hrRouter = express.Router();

hrRouter.use("/user", userRouter);
hrRouter.use("/onboarding", onboardingRouter);
hrRouter.use("/facilityIssue", facilityIssueRouter);
// hrRouter.use('/hiring', hiringRouter)

export default hrRouter;
