import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express'

import apiRouter from './api/api'
import connectToDB from './config/connection'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

let uri = process.env.URI || ''
const password = process.env.PASSWORD || ''
const username = process.env.APP_USERNAME || ''
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
});

connectToDB();