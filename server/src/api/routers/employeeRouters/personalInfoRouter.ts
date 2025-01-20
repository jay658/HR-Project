import { getPersonalInfo, testPersonalInfoRouter, updatePersonalInfo, uploadPersonalInfoFile } from '../../../controllers/employeeControllers/personalInfo';

import express from 'express';

const personalInfoRouter = express.Router();

personalInfoRouter
  .get('/test', testPersonalInfoRouter)
  .get('/', getPersonalInfo)
  .post('/upload', uploadPersonalInfoFile)
  .put('/update', updatePersonalInfo);

export default personalInfoRouter;
