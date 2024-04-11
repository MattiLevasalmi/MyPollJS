var bcrypt = require('bcrypt');
var {v4 : uuidv4} = require('uuid')
var users = require('./data').userDB;

module.exports = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    try{
        let foundUser = users.find((data) => email === data.email);
        if (!foundUser) {
            let hashPassword = await bcrypt.hash(password, 10);
            let newUser = {
                email: email,
                password: hashPassword,
                id: (users.length + 1),
                access_token: uuidv4()
            };
            users.push(newUser);
            res.json({
                "access_token": newUser.access_token,
                "id": newUser.id
            });
        }
        else {
            res.statusCode = 401;
            res.json("Email already in use by another account")
        }
    } catch{
        res.statusCode = 500;
        res.json("Internal server error");
    }
}