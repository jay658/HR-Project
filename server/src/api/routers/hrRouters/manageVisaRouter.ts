import express from "express";
import { testManageVisaRouter, getInProgress } from "../../../controllers/hrControllers/manageVisa";

const manageVisaRouter = express.Router();

manageVisaRouter.get('/test', testManageVisaRouter)
manageVisaRouter.get('/in-progress', getInProgress)

export default manageVisaRouter;