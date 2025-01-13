import config from '../utility/configs';
import mongoose from 'mongoose';

let uri = config.URI;
const password = config.PASSWORD;
const username = config.USERNAME;

uri = uri.replace('<PASSWORD>', password).replace('<USERNAME>', username);

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (err) {
    console.log(`There was an error connecting to the DB: ${err}`);
  }
};

export default connectToDB;
