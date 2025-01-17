import {
  getOnboardingForUser,
  testOnboardingRouter,
  updateOnboardingForUser,
  uploadOnboardingFile
} from '../../../controllers/employeeControllers/onboarding'

import express from 'express'

const onboardingRouter = express.Router()

onboardingRouter
  .get('/test', testOnboardingRouter)
  .get('/', getOnboardingForUser)
  .post('/upload', uploadOnboardingFile)
  .put('/update', updateOnboardingForUser)

export default onboardingRouter