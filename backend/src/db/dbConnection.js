import { MongoClient, ServerApiVersion } from 'mongodb';
import uri from '../secret.js';

let client;
let db;

export const connectToDatabase = async () => {
    try{
        client = new MongoClient(uri, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            }
        });
        await client.connect();
        console.log("Database connected")
        db = client.db('MyPollJS')
    } catch (err) {
        console.error("Failed to connect to MongoDB: " + err);
        process.exit(1);
    }
}

export const getDatabase = () => {
    if (!db) {
        throw new Error ("Database not connected");
    }
    return db;
}