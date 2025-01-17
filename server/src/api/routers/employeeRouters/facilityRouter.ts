import {
  closeFacilityIssue,
  commentOnFacilityIssue,
  createFacilityIssue,
  getFacilityIssue,
  getFacilityIssuesForApartment,
  getIssuesForUser,
  testFacilityRouter,
} from "../../../controllers/employeeControllers/facility";

import express from "express";

const facilityIssueRouter = express.Router();

facilityIssueRouter
  .get("/test", testFacilityRouter)
  .get("/user", getIssuesForUser)
  .get("/issue/:id", getFacilityIssue)
  .get("/apartment/:id", getFacilityIssuesForApartment)
  .post("/create", createFacilityIssue)
  .put("/comment/:facilityIssueId", commentOnFacilityIssue)
  .put("/close/:facilityIssueId", closeFacilityIssue);

export default facilityIssueRouter;
