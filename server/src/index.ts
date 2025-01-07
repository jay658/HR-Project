import cors, { CorsOptions } from 'cors'
import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT = process.env.PORT || 3000

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.get('/api', (_req: Request, res: Response) => {
  res.json('test message')
})

app.listen(PORT, () => {
  console.log(`Listening to server: ${PORT}`)
})