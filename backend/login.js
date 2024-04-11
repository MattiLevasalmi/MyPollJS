var bcrypt = require('bcrypt');
var users = require('./data').userDB;

module.exports = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    try{
        let foundUser = users.find((data) => email === data.email);
        if (foundUser) {
            let storedPass = foundUser.password;

            const passwordMatch = await bcrypt.compare(password, storedPass);
            if (passwordMatch) {
                res.json({
                    "access_token": foundUser.access_token,
                    "id": foundUser.id
                });
            }
            else {
                res.statusCode = 401;
                res.json("Incorrect Password");
            }
        }
        else {
            res.statusCode = 401;
            res.json("No account could be found linked to inputted email, please check input or register a new account");
        }
    } catch {
        res.statusCode = 500;
        res.json("Internal server error");
    }

}