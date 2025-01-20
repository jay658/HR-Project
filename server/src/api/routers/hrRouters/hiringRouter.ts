import express from 'express'
import { testHiringRouter, sendRegistrationEmail } from '../../../controllers/hrControllers/hiring'

const hiringRouter = express.Router()

hiringRouter.get('/test', testHiringRouter)
hiringRouter.post('/send-email',sendRegistrationEmail)

export default hiringRouter