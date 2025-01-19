import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../db/dbConnection.js';

const register = async function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    const db = getDatabase();
    const collection = db.collection('Users');
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
            res.json("Account Created! Please login now.");
        }
    }
}

export default register