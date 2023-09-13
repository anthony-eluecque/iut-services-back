import express from 'express';
// import { connectToDb } from './src/config/database';
import dotenv from 'dotenv';
dotenv.config();

import { connectToDb } from './src/config';
import useRouter from './src/routes'

const app = express();
const port = process.env.PORT || 3000;
connectToDb();

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

app.use(useRouter);
