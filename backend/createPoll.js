const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = require('./secret');

module.exports = async function(req, res) {
    var poll = req.body;

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
    await collection.insertOne(poll);
    client.close();
}