import mongoose , {  } from 'mongoose';


export const connectToDb = async () => {
  try {
    console.log('Trying to access the db...');
    await mongoose.connect(process.env.DBPATH);
    console.log('Connected successfully to database\n');
  } catch (e) {
    console.log("Database connection Error : " + e);
  }
};
