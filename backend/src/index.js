import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import login from './endpoints/login.js'; //todo
import register from './endpoints/register.js'; //todo
import createPoll from './endpoints/createPoll.js'; //todo
import getPoll from './endpoints/getPoll.js'; //todo
import getPollbyId from './endpoints/getPollbyId.js'; //todo
import getPollbyPollId from './endpoints/getPollbyPollId.js'; //todo
import answerPoll from './endpoints/answerPoll.js'; //todo

dotenv.config();
const app = express();

var corsOptions = {
    origin: process.env.origin, 
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/login', (req, res) => {
    login(req, res);
});

app.post('/register', (req, res) => {
    register(req, res);
});

app.post('/polls', (req, res) => {
    createPoll(req, res);
}); 

app.get('/polls', (req, res) => {
    getPoll(req, res);
});

app.get('/polls/owner/:id', (req, res) => {
    getPollbyId(req, res);
})

app.get('/polls/:id', (req, res) => {
    getPollbyPollId(req, res);
})

app.put('/polls', (req, res) => {
    answerPoll(req, res);
});

export default app;