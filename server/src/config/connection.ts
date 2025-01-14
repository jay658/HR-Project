import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
let uri = process.env.URI || '';
const password = process.env.PASSWORD || '';
const username = process.env.USERNAME || '';

uri = uri.replace('<PASSWORD>', password).replace('<USERNAME>', username);

const connectToDB = async() => {
  try{
    await mongoose.connect(uri);
    await mongoose.connection.db?.admin().command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(err){
    console.log(`There was an error connecting to the DB: ${err}`);
  }
};

export default connectToDB;
