import { config } from 'dotenv';
import mongoose , {  } from 'mongoose';
config();

const uri = process.env.URL;

export const connectToDb = async () => {
  try {
    console.log('Trying to access the db...');
    // Connect the client to the server (optional starting in v4.7)
    await mongoose.connect(uri);
    // Establish and verify connection
    console.log('Connected successfully to server');
  } catch (e) {
    // Ensures that the client will close when you finish/error
    console.log(JSON.stringify(e));
    await mongoose.connection.close();
    throw e;
  }
};


