import express from 'express'
import { testApartmentRouter } from '../../controllers/apartment'

const apartmentRouter = express.Router()

apartmentRouter.get('/test', testApartmentRouter)

export default apartmentRouter