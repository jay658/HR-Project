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

const visaRouter = express.Router();

visaRouter.get("/test", testVisaRouter);
visaRouter.get("/allvisa", getAllExistVisa);
visaRouter.post("/create", createVisa);
visaRouter.get("/next-document", getNextRequiredDocument);
visaRouter.post("/upload", uploadNewDocument);
visaRouter.get("/status", getVisaStatus);
visaRouter.get("/visatype", getVisaType);
visaRouter.post("/getfileurl", getFileURL);

export default visaRouter;
