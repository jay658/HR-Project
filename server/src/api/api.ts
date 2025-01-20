import cors, { CorsOptions } from "cors";

import { authenticateToken } from "../middleware/authMiddleware";
import config from "../utility/configs";
import employeeRouter from "./routers/employeeRouter";
import express from "express";
import hrRouter from "./routers/hrRouter";

const apiRouter = express.Router();

const hrCorsOptions: CorsOptions = {
  origin: [config.HR_SERVER],
};

const employeeCorsOptions: CorsOptions = {
  origin: [config.EMPLOYEE_SERVER],
};

apiRouter.use("/employee", cors(employeeCorsOptions), authenticateToken('employee'), employeeRouter);
apiRouter.use("/hr", cors(hrCorsOptions), authenticateToken('hr'), hrRouter);

export default apiRouter;
