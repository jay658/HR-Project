import { getPersonalInfo, testPersonalInfoRouter, updatePersonalInfo } from '../../../controllers/employeeControllers/personalInfo';

import express from 'express';

const personalInfoRouter = express.Router();

personalInfoRouter
  .get('/test', testPersonalInfoRouter)
  .get('/', getPersonalInfo)
  .put('/update', updatePersonalInfo);

export default personalInfoRouter;
