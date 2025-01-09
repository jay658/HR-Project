import express from 'express'

const onboardingRouter = express.Router()

onboardingRouter.get('/test', (_req, res) => {
  try{
    res.json('Successfully hit onboarding router')
  }catch(err){
    console.log(`There was an error in the onboarding test route: ${err}`)
  }
})

export default onboardingRouter