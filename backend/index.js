var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());

var corsOptions = {
    origin: 'https://mypolljs.vercel.app',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var login = require('./login');

app.post('/login', cors(corsOptions), (req, res) => {
    login(req, res);
});

var register = require('./register');

app.post('/register', cors(corsOptions), (req, res) => {
    register(req, res);
});

app.listen(3000);