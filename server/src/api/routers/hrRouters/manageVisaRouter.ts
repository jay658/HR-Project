import express from "express";
import { testManageVisaRouter, getInProgress,
    sendEmailNotification, approveVisa, rejectVisa, searchEmployee
 } from "../../../controllers/hrControllers/manageVisa";
import { send } from "@emailjs/nodejs";

const manageVisaRouter = express.Router();

manageVisaRouter.get('/test', testManageVisaRouter)
manageVisaRouter.get('/in-progress', getInProgress)
manageVisaRouter.post('/notification', sendEmailNotification)
manageVisaRouter.post('/approve',approveVisa)
manageVisaRouter.post('/reject', rejectVisa)
manageVisaRouter.get('/search',searchEmployee)

export default manageVisaRouter;