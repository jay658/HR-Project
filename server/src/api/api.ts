import cors, { CorsOptions } from 'cors';

import config from '../utility/configs';
import employeeRouter from './routers/employeeRouter';
import express from 'express';
import hrRouter from './routers/hrRouter';

const apiRouter = express.Router();

const hrCorsOptions: CorsOptions = {
  origin: [config.HR_SERVER]
}

const employeeCorsOptions: CorsOptions = {
  origin: [config.EMPLOYEE_SERVER]
}

apiRouter.use('/employee', cors(employeeCorsOptions), employeeRouter)
apiRouter.use('/hr', cors(hrCorsOptions), hrRouter)

export default apiRouter;
