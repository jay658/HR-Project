import express from 'express'
import { testApartmentRouter } from '../../../controllers/employeeControllers/apartment'

const apartmentRouter = express.Router()

apartmentRouter.get('/test', testApartmentRouter)

export default apartmentRouter