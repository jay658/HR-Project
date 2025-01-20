import dotenv from 'dotenv'
dotenv.config()

const config = {
  URI: process.env.URI || '',
  USERNAME: process.env.APP_USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
  AWS_REGION: process.env.AWS_REGION || '',
  EMPLOYEE_SERVER: process.env.EMPLOYEE_SERVER || '',
  HR_SERVER: process.env.HR_SERVER || '',
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || '',
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || '',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || '',
  EMAILJS_NOTIIFICATION_TEMPLATE_ID: process.env.EMAILJS_NOTIIFICATION_TEMPLATE_ID || '',
  SALT: process.env.SALT || '10',
  PORT: process.env.PORT || 3000
}

export default config