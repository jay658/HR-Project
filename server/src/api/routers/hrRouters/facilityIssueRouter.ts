import { addCommentOnFacilityIssue, deleteCommentOnFacilityIssue, getFacilityIssuesByApartment, testFacilityIssueRouter } from '../../../controllers/hrControllers/facilityIssue'

import express from 'express'

const facilityIssueRouter = express.Router()

facilityIssueRouter.get('/test', testFacilityIssueRouter)
facilityIssueRouter.get('/:apartmentId', getFacilityIssuesByApartment)
facilityIssueRouter.post('/:facilityIssueId', addCommentOnFacilityIssue)
facilityIssueRouter.delete('/:facilityIssueId/:commentId', deleteCommentOnFacilityIssue)

export default facilityIssueRouter