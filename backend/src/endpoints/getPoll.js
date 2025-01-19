import { getDatabase } from '../db/dbConnection.js';

const getPoll = async function(req, res) {
    const db = getDatabase();
    const collection = db.collection('Polls');
    var polls = await collection.find().toArray();
    if (polls) {
        res.json(polls);
    }
}

export default getPoll;