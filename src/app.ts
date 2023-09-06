import express, { Response, Request} from 'express';
import { connectToDb, getCollection } from './utils';
import { config } from "dotenv"
config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res ) => {
  res.send('Hello World!');
});

const startServer = async () => {
  try {
    connectToDb();
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.warn(error)
  }
}
startServer();
const collection = getCollection("test");
