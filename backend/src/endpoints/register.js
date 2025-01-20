import bcrypt from 'bcrypt';
import { readDocuments, createDocument } from '../contollers/crud.js';

const register = async function(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let user = await readDocuments('Users', { email: email });
    if (user[0]) {
        res.statusCode = 401;
        res.json("Email already in use by another account")
    }
    else {
        let hashPassword = await bcrypt.hash(password, 10);
        let newUser = {
            username: username,
            email: email,
            password: hashPassword
        };
        let result = await createDocument('Users', newUser);
        res.json(result);
    }
}

export default register