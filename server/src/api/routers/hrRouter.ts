import express from "express";
import facilityIssueRouter from "./hrRouters/facilityIssueRouter";
import onboardingRouter from "./hrRouters/onboardingRouter";
import userRouter from "./hrRouters/userRouter";
import manageVisaRouter from "./hrRouters/manageVisaRouter";
import hiringRouter from "./hrRouters/hiringRouter";
import housingRouter from "./hrRouters/housingRouter";
import { authenticateToken } from "../../middleware/authMiddlewareHR";
const hrRouter = express.Router();

hrRouter.use("/user", userRouter);

hrRouter.use("/onboarding", onboardingRouter);
hrRouter.use("/facilityIssue", authenticateToken, facilityIssueRouter);
hrRouter.use("/manage-visa", manageVisaRouter);
hrRouter.use("/hiring", hiringRouter);
hrRouter.use("/housing", housingRouter);

export default hrRouter;
