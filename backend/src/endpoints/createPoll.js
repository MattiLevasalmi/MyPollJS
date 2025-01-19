import { getDatabase } from '../db/dbConnection.js';

const createPoll = async function(req, res) {
    var poll = req.body;

    const db = getDatabase();
    const collection = db.collection('Polls');
    await collection.insertOne(poll);
}

export default createPoll;