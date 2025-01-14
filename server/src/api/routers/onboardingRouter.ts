import {
  getOnboardingForUser,
  testOnboardingRouter,
  updateOnboardingForUser,
  updateOnboardingStatus
} from '../../controllers/onboarding'

import express from 'express'

const onboardingRouter = express.Router()

onboardingRouter
  .get('/test', testOnboardingRouter)
  .get('/', getOnboardingForUser)
  .put('/update', updateOnboardingForUser)
  .put('/updateStatus', updateOnboardingStatus)

export default onboardingRouter