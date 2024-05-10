var MongoClient = require('mongodb').MongoClient;
var ServerApiVersion = require('mongodb').ServerApiVersion;
var uri = require('./secret');

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});
module.exports = client;