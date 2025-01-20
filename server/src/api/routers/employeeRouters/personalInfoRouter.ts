import { getPersonalInfo, testPersonalInfoRouter, updatePersonalInfo, uploadPersonalInfoFile } from '../../../controllers/employeeControllers/personalInfo';

import express from 'express';
import { authenticateToken } from '../../../middleware/authMiddleware';

const personalInfoRouter = express.Router();

personalInfoRouter
  .get('/test', testPersonalInfoRouter)
  .get('/', authenticateToken, getPersonalInfo)
  .post('/upload', authenticateToken, uploadPersonalInfoFile)
  .put('/update', authenticateToken, updatePersonalInfo);

export default personalInfoRouter;
