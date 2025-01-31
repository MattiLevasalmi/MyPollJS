import { readDocuments } from '../contollers/crud.js';

const getPoll = async function(req, res) {
    var polls = await readDocuments('Polls', {})
    if (polls) {
        res.json(polls);
    }
}

export default getPoll;