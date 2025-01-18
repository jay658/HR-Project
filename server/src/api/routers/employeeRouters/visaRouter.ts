import {
  createVisa,
  getAllExistVisa,
  getNextRequiredDocument,
  getVisaStatus,
  testVisaRouter,
  uploadNewDocument
} from '../../../controllers/employeeControllers/visa'

import express from 'express'
<<<<<<< HEAD:server/src/api/routers/visaRouter.ts
import { testVisaRouter, getAllExistVisa, getVisaStatus,
  createVisa, getNextRequiredDocument, uploadNewDocument, getVisaType, getFileURL
} from '../../controllers/visa'
=======
>>>>>>> main:server/src/api/routers/employeeRouters/visaRouter.ts

const visaRouter = express.Router()

visaRouter.get('/test', testVisaRouter)
visaRouter.get('/allvisa', getAllExistVisa)
visaRouter.post('/create', createVisa)
visaRouter.get('/next-document', getNextRequiredDocument)
visaRouter.post('/upload', uploadNewDocument)
visaRouter.get('/status', getVisaStatus)
visaRouter.get('/visatype', getVisaType)
visaRouter.post('/getfileurl', getFileURL)


export default visaRouter