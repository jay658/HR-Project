import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
let uri = process.env.URI || ''
const password = process.env.PASSWORD || ''
const username = process.env.USERNAME || ''

uri = uri.replace('<PASSWORD>', password).replace('<USERNAME>', username)

mongoose.connect(uri)

export default mongoose.connection