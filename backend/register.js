var bcrypt = require('bcrypt');
var {v4 : uuidv4} = require('uuid')
var client = require('./dbConnect').client;

module.exports = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.connect(async (err) => {
        if (err) {
            res.statusCode = 500;
            res.json("Internal server error");
        }
        else {
            const collection = client.db('MyPollJS').collection('Users');
            const user = collection.find({ email: email });
            if (user) {
                res.statusCode = 401;
                res.json("Email already in use by another account")
            }
            else {
                let hashPassword = await bcrypt.hash(password, 10);
                let newUser = {
                email: email,
                password: hashPassword,
                id: (users.length + 1),
                access_token: uuidv4()
                };
                collection.insertOne(newUser, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json("Internal server error");
                    }
                    if (result) {
                        res.json({
                            "access_token": newUser.access_token,
                            "id": newUser.id
                        });
                    }
                })
            }
            client.close();
        }
    });
}