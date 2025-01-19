import { getDatabase } from '../db/dbConnection.js';

const answerPoll = async function(req, res) {
    var pollId = new ObjectId(req.body.poll);
    var votes = req.body.votes;

    const db = getDatabase();
    const collection = db.collection('Polls');
    var poll = await collection.findOne({ _id: pollId });
    let ques;
    let ans;
    for (let i = 0; i < votes.length; i ++){
        ques = votes[i].question;
        ans = votes[i].answer;
        poll.questions[ques].answers[ans].count += 1;
    }
    await collection.updateOne({ _id: pollId }, {$set: {"questions" : poll.questions}});
    res.json("Votes Submitted");
    client.close();
}

export default answerPoll;