const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = require('./secret');

module.exports = async function(req, res) {
    var pollId = new ObjectId(req.body.poll);
    var votes = req.body.votes;

    const client = new MongoClient(uri, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });

    let conn;
    try{
        await client.connect();
    } catch (err) {
        res.statusCode = 500;
        res.json("Internal server error: " + err);
    }

    const collection = client.db('MyPollJS').collection('Polls');
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