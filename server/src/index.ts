import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express'

import apiRouter from './api/api'
import config from './utility/configs'
import connectToDB from './config/connection'
import fileUpload from 'express-fileupload'

const app: Express = express()
const PORT = config.PORT

app.use(express.json())
app.use(fileUpload())

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Listening to server: ${PORT}`)
});

connectToDB();