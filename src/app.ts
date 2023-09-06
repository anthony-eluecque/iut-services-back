import express from 'express';
import { connectToDb } from './utils';
import { config } from 'dotenv';
config();

import useRouter from './routes/index';

const app = express();
const port = process.env.PORT;

const startServer = async () => {
  try {
    connectToDb();
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });

    app.use(useRouter);

  } catch (error) {
    console.warn(error);
  }
};
startServer();
