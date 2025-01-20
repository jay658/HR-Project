import express from "express";
import { testManageVisaRouter, getInProgress, sendEmailNotification,
    approveVisa, rejectVisa, searchEmployee, getPendingDocument
 } from "../../../controllers/hrControllers/manageVisa";

const manageVisaRouter = express.Router();

manageVisaRouter.get('/test', testManageVisaRouter)
manageVisaRouter.get('/in-progress', getInProgress)
manageVisaRouter.post('/notification', sendEmailNotification)
manageVisaRouter.post('/approve',approveVisa)
manageVisaRouter.post('/reject', rejectVisa)
manageVisaRouter.get('/search',searchEmployee)
manageVisaRouter.get('/pending',getPendingDocument)

export default manageVisaRouter;