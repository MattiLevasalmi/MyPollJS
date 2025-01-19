import { getDatabase } from '../db/dbConnection.js';

const getPollbyPollId = async function(req, res) {
    var pollId = new ObjectId(req.params.id);

    const db = getDatabase();
    const collection = db.collection('Polls');
    var poll = await collection.findOne( { _id: pollId } );
    
    if (poll) {
        res.json(poll);
    }
}

export default getPollbyPollId;