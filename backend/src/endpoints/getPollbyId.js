import { getDatabase } from '../db/dbConnection.js';

const getPollbyId = async function(req, res) {
    var ownerId = req.params.id;

    const db = getDatabase();
    const collection = db.collection('Polls');
    var polls = await collection.find( { ownerID: ownerId } ).toArray();
    if (polls) {
        res.json(polls);
    }
}

export default getPollbyId;