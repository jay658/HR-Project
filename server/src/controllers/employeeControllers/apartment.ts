import { Request, Response } from "express"

const testApartmentRouter = (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit apartment router')
  }catch(err){
    console.log(`There was an error in the apartment test route: ${err}`)
  }
}

export {
  testApartmentRouter
}