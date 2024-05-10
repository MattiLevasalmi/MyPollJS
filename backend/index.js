var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}

var login = require('./login');

app.post('/login', cors(corsOptions), (req, res) => {
    login(req, res);
});

var register = require('./register');

app.post('/register', cors(corsOptions), (req, res) => {
    register(req, res);
});

app.listen(3000);