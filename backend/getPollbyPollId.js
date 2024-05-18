const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = require('./secret');

module.exports = async function(req, res) {
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

    var pollId = new ObjectId(req.params.id);

    const collection = client.db('MyPollJS').collection('Polls');
    var poll = await collection.findOne( { _id: pollId } );
    
    if (poll) {
        res.json(poll);
    }
    client.close();
}