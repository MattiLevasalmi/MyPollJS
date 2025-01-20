import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { readDocuments } from '../contollers/crud.js';

dotenv.config();

const login = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    const results = await readDocuments('Users', { email: email });
    if (results.length == 0) {
        res.statusCode = 401;
        res.json("No account could be found linked to inputted email, please check input or register a new account");
        return;
    }

    const user = results[0];
    await bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.error("Error comparing passwords ", err);
            return;
        }
        else if (result){
            const payload = {
                username: user.username,
                id: user._id
            }
            const token = jwt.sign(payload, process.env.JWTpass, {expiresIn: '2h'});
            res.json({
                "token": token,
                "id": user._id
            });
        }
        else {
            res.statusCode = 401;
            res.json("Incorrect Password");
        }
    });
}

export default login;