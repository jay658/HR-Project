import {
  getOnboardingForUser,
  testOnboardingRouter,
  updateOnboardingForUser,
  uploadOnboardingFile
} from '../../../controllers/employeeControllers/onboarding';

import { authenticateToken } from '../../auth/authMiddleware';
import express from 'express';

const onboardingRouter = express.Router();

onboardingRouter
  .get('/test', testOnboardingRouter)
  .get('/', authenticateToken, getOnboardingForUser)
  .post('/upload', authenticateToken, uploadOnboardingFile)
  .put('/update', authenticateToken, updateOnboardingForUser);

export default onboardingRouter;
