var bcrypt = require('bcrypt');
var client = require('./dbConnect').client;

module.exports = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.connect((err) => {
        if (err) {
            res.statusCode = 501;
            res.json("Internal server error: " + err);
        }
        else {
            const collection = client.db('MyPollJS').collection('Users');
            const user = collection.find({ email: email });
            if (!user) {
                res.statusCode = 401;
                res.json("No account could be found linked to inputted email, please check input or register a new account");
            }
            client.close();
        }
    });

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