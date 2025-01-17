import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { UploadedFile } from 'express-fileupload'
import config from '../configs'

const connectToAWS = () => {
  try{
    const s3 = new S3Client({
      region: config.AWS_REGION,
      credentials:{
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
      }
    });

    return s3;
  }catch(err: unknown){
    console.log(`There was an error connecting to AWS: ${err}`);
  }
};

const uploadFileToAWS = async (file: UploadedFile) => {
  try{
    const s3 = connectToAWS();

    if(!s3) throw Error("Couldn\'t connect to s3");

    // Change this key value if we decide to keep a more unique key in the future.
    const key = file.name

    const params = {
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
      ContentDisposition: 'inline'
    };

    await s3.send(
      new PutObjectCommand(params)
    );

    const awsURL = `https://hr-project-bucket-7g9x3l2p5.s3.us-east-2.amazonaws.com/${key}`

    return awsURL
  }catch(err: unknown){
    console.log(err);
  }
};

export {
  uploadFileToAWS
}