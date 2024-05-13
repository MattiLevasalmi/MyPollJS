var bcrypt = require('bcrypt');
var {v4 : uuidv4} = require('uuid')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = require('./secret');

module.exports = async function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;


    const client = new MongoClient(uri, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });

    try{
        await client.connect();
    } catch (err) {
        res.statusCode = 500;
        res.json("Internal server error: " + err);
    }

    const collection = client.db('MyPollJS').collection('Users');
    user = await collection.findOne({ email: email });
    if (user) {
        res.statusCode = 401;
        res.json("Email already in use by another account")
    }
    else {
        let hashPassword = await bcrypt.hash(password, 10);
        let newUser = {
            username: username,
            email: email,
            password: hashPassword,
            access_token: uuidv4()
        };
        let result = await collection.insertOne(newUser);
        if (result){
            res.json({
                "access_token": newUser.access_token
            });
        }
    }
    client.close();
}