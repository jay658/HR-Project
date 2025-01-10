import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express'

import apiRouter from './api/api'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

let uri = process.env.URI || ''
const password = process.env.PASSWORD || ''
const username = process.env.USERNAME || ''
uri = uri.replace('<PASSWORD>', password).replace('<USERNAME>', username)

const app: Express = express()
const PORT = process.env.PORT || 3000

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Listening to server: ${PORT}`)
})

async function runDB() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db?.admin().command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(err){
    console.log(`There was an error connecting to the db: ${err}`)
  }
}

runDB()