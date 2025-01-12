import express from 'express'

const userRouter = express.Router()

userRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit user router')
    console.log("testing")
  }catch(err){
    console.log(`There was an error in the user test route: ${err}`)
  }
})

export default userRouter