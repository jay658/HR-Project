import apartmentRouter from "./routers/apartmentRouter";
import express from "express";
import facilityIssueRouter from "./routers/facilityRouter";
import onboardingRouter from "./routers/onboardingRouter";
import personalInfoRouter from "./routers/personalInfoRouter";
import userRouter from "./routers/userRouter";
import visaRouter from "./routers/visaRouter";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/apartment", apartmentRouter);
apiRouter.use("/onboarding", onboardingRouter);
apiRouter.use("/visa", visaRouter);
apiRouter.use("/facilityIssue", facilityIssueRouter);
apiRouter.use("/personalInfo", personalInfoRouter);

export default apiRouter;
