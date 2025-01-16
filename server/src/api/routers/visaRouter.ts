import express from 'express'
import { testVisaRouter, getAllExistVisa, getVisaStatus,
  createVisa, getNextRequiredDocument, uploadNewDocument, getVisaType
} from '../../controllers/visa'

const visaRouter = express.Router()

visaRouter.get('/test', testVisaRouter)
visaRouter.get('/allvisa', getAllExistVisa)
visaRouter.post('/create', createVisa)
visaRouter.get('/next-document', getNextRequiredDocument)
visaRouter.post('/upload', uploadNewDocument)
visaRouter.get('/status', getVisaStatus)
visaRouter.get('/visatype', getVisaType)


export default visaRouter