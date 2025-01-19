import bcrypt from 'bcrypt';
import { getDatabase } from '../db/dbConnection.js';

const login = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    const db = getDatabase();
    const collection = db.collection('Users');
    const user = await collection.findOne({ email: email });
    if (!user) {
        res.statusCode = 401;
        res.json("No account could be found linked to inputted email, please check input or register a new account");
    }
    else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.json({
                "access_token": user.access_token,
                "id": user._id
            });
        }
        else {
            res.statusCode = 401;
            res.json("Incorrect Password");
        }
    }
}

export default login;