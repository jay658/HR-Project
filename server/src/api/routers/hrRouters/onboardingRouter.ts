import { getOnboardings, testOnboardingRouter, updateOnboardingStatus } from '../../../controllers/hrControllers/onboarding'

import express from 'express'

const onboardingRouter = express.Router()

onboardingRouter.get('/test', testOnboardingRouter)
onboardingRouter.get('/', getOnboardings)
onboardingRouter.put('/updateStatus/:onboardingId', updateOnboardingStatus)

export default onboardingRouter