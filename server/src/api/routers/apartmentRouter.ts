import express from 'express'

const apartmentRouter = express.Router()

apartmentRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit apartment router')
  }catch(err){
    console.log(`There was an error in the apartment test route: ${err}`)
  }
})

export default apartmentRouter