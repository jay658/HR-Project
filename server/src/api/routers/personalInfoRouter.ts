import { getPersonalInfo, testPersonalInfoRouter, updatePersonalInfo } from '../../controllers/personalInfo';

import express from 'express';

const personalInfoRouter = express.Router();

personalInfoRouter
  .get('/test', testPersonalInfoRouter)
  .get('/', getPersonalInfo)
  .put('/update', updatePersonalInfo);

export default personalInfoRouter;
