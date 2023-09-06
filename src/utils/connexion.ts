import { MongoClient , Collection } from "mongodb";
import { config } from "dotenv"
config();

const dbName = process.env.DBNAME
const uri = process.env.URL

const client = new MongoClient(uri)

export const connectToDb = async () => {
    try {
        console.log('Trying to access the db...');
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db('admin').command({ ping: 1 });
        console.log('Connected successfully to server');
    } catch (e) {
        // Ensures that the client will close when you finish/error
        console.log(JSON.stringify(e));
        await client.close();
        throw e;
    }
}

export const getCollection = (collectionName : string) : Collection<Document> => {
    return client.db(dbName).collection(collectionName)
}

