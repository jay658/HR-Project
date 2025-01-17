import dotenv from 'dotenv'
dotenv.config()

const config = {
  URI: process.env.URI || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
  AWS_REGION: process.env.AWS_REGION || '',
  EMPLOYEE_SERVER: process.env.EMPLOYEE_SERVER || '',
  HR_SERVER: process.env.HR_SERVER || '',
  SALT: process.env.SALT || '10',
  PORT: process.env.PORT || 3000
}

export default config