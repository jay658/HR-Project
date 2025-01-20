<<<<<<< HEAD
import express from 'express'
import { testVisaRouter, getAllExistVisa, getVisaStatus,
  createVisa, getNextRequiredDocument, uploadNewDocument, getVisaType,
  getFileURL,
} from '../../../controllers/employeeControllers/visa'
=======
import {
  createVisa,
  getAllExistVisa,
  getNextRequiredDocument,
  getVisaStatus,
  testVisaRouter,
  uploadNewDocument,
  getVisaType,
  getFileURL,
} from "../../../controllers/employeeControllers/visa";

import express from "express";
>>>>>>> main

const visaRouter = express.Router();

<<<<<<< HEAD
visaRouter.get('/test', testVisaRouter)
visaRouter.get('/allvisa', getAllExistVisa)
visaRouter.post('/create', createVisa)
visaRouter.get('/next-document', getNextRequiredDocument)
visaRouter.post('/upload', uploadNewDocument)
visaRouter.get('/status', getVisaStatus)
visaRouter.get('/visatype', getVisaType)
visaRouter.post('/getfileurl', getFileURL)
=======
visaRouter.get("/test", testVisaRouter);
visaRouter.get("/allvisa", getAllExistVisa);
visaRouter.post("/create", createVisa);
visaRouter.get("/next-document", getNextRequiredDocument);
visaRouter.post("/upload", uploadNewDocument);
visaRouter.get("/status", getVisaStatus);
visaRouter.get("/visatype", getVisaType);
visaRouter.post("/getfileurl", getFileURL);
>>>>>>> main

export default visaRouter;
