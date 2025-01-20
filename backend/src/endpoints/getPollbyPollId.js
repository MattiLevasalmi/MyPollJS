import { readDocuments } from '../contollers/crud.js';

const getPollbyPollId = async function(req, res) {
    var pollId = new ObjectId(req.params.id);

    var polls = await readDocuments('Polls', { _id: pollId } );
    const poll = polls[0];
    
    if (poll) {
        res.json(poll);
    }
}

export default getPollbyPollId;