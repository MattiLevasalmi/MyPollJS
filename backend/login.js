var bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = require('./secret');
let user;

module.exports = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

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

    const collection = client.db('MyPollJS').collection('Users');
    user = await collection.findOne({ email: email });
    client.close();
    if (!user) {
        res.statusCode = 401;
        res.json("No account could be found linked to inputted email, please check input or register a new account");
    }
    else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.json({
                "access_token": user.access_token,
                "id": user.id
            });
        }
        else {
            res.statusCode = 401;
            res.json("Incorrect Password");
        }
    }
}