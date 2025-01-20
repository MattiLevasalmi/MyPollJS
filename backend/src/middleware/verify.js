import { jwt } from 'jsonwebtoken';
import { dotenv } from 'dotenv';

dotenv.config();

const verify = (req, res, next) => {
    var header = req.header.authorization.split(' ');
    if (header[0] != 'Bearer'){
        res.status = 401;
        res.json("Access denied, Bearer not presented");
        return
    }
    const token = header[1];
    if (!token) {
        res.status = 401;
        res.json("Access denied, Token not presented")
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTpass);
        res.json(decoded.payload);
        next();
    } catch (err) {
        console.error("Invalid token " + err)
    }
}
export default verify;