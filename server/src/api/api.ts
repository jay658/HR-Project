import cors, { CorsOptions } from "cors";

import { authenticateToken } from "../middleware/authMiddleware";
import config from "../utility/configs";
import employeeRouter from "./routers/employeeRouter";
import express from "express";
import hrRouter from "./routers/hrRouter";

const apiRouter = express.Router();

const hrCorsOptions: CorsOptions = {
  origin: [config.HR_SERVER],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

const employeeCorsOptions: CorsOptions = {
  origin: [config.EMPLOYEE_SERVER],
};

apiRouter.use(
  "/employee",
  cors(employeeCorsOptions),
  authenticateToken,
  employeeRouter
);
apiRouter.use("/hr", cors(hrCorsOptions), hrRouter);

export default apiRouter;
