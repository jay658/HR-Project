import { getAllUserRouter, registerRouter, testUserRouter } from '../../../controllers/employeeControllers/user'

import express from 'express'

const userRouter = express.Router()

userRouter.get('/test', testUserRouter)
userRouter.get('/allusers', getAllUserRouter)
userRouter.post('/register', registerRouter)

export default userRouter