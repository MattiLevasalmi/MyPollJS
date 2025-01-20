import { readDocuments } from '../contollers/crud.js';

const getPollbyId = async function(req, res) {
    var ownerId = req.params.id;

    var polls = await readDocuments('Polls', { ownerID: ownerId });
    if (polls.length != 0) {
        res.json(polls);
    }
}

export default getPollbyId;