import express from 'express'

const facilityRouter = express.Router()

facilityRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit facility router')
  }catch(err){
    console.log(`There was an error in the facility test route: ${err}`)
  }
})

export default facilityRouter