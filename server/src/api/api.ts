import apartmentRouter from './routers/apartmentRouter'
import express from 'express'
import onboardingRouter from './routers/onboardingRouter'
import userRouter from './routers/userRouter'
import visaRouter from './routers/visaRouter'

const apiRouter = express.Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/apartment', apartmentRouter)
apiRouter.use('/onboarding', onboardingRouter)
apiRouter.use('/visa', visaRouter)

export default apiRouter