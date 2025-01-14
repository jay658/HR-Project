import express from 'express'
import { testVisaRouter } from '../../controllers/visa'

const visaRouter = express.Router()

visaRouter.get('/test', testVisaRouter)

export default visaRouter