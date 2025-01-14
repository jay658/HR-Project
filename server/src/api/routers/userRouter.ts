import express from 'express'
import { testUserRouter, getAllUserRouter, registerRouter} from '../../controllers/user'

const userRouter = express.Router()

userRouter.get('/test', testUserRouter)
userRouter.get('/allusers', getAllUserRouter)
userRouter.post('/register', registerRouter)

export default userRouter