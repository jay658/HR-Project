import {
  getOnboardingForUser,
  testOnboardingRouter,
  updateOnboardingForUser,
  updateOnboardingStatus,
  uploadOnboardingFile
} from '../../controllers/onboarding'

import express from 'express'

const onboardingRouter = express.Router()

onboardingRouter
  .get('/test', testOnboardingRouter)
  .get('/', getOnboardingForUser)
  .post('/upload', uploadOnboardingFile)
  .put('/update', updateOnboardingForUser)
  .put('/updateStatus', updateOnboardingStatus)

export default onboardingRouter