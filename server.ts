import express from 'express';
// import { connectToDb } from './src/config/database';
import dotenv from 'dotenv';
dotenv.config();


import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDb } from './src/config';
import useRouter from './src/routes'

const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin : [
    "http://localhost:3000"
  ],
  credentials : true
}));

const port = process.env.NODEJS_PORT || 3000;
connectToDb();

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

app.use(useRouter);
