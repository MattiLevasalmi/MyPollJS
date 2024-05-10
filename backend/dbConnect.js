import { MongoClient, ServerApiVersion } from 'mongodb';
import { uri } from './secret.js';

export const client = new MongoClient(uri, {
    useNewUrlPaser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});