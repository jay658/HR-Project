import express from 'express'

const visaRouter = express.Router()

visaRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit visa router')
  }catch(err){
    console.log(`There was an error in the visa test route: ${err}`)
  }
})

export default visaRouter