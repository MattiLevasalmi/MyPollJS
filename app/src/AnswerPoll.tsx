import { useLocation, useNavigate } from "react-router-dom";
import { question } from "./context";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import axios from "axios";


export default function AnswerPoll(){

    type vote = {
        question: number,
        answer: number
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    const [votes, setVotes] = useState<vote[]>([]);

    const submitVotes = () => {
        axios.put("https://pollapi.vercel.app/polls", { 
            votes: votes,
            poll: state._id
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <h1>{state.pollName}</h1>
            <Stack spacing={3}>
                {state.questions.map((question: number, index: number) =>
                    <ShowQuestion key={index} ques={question} question={index} setVotes={setVotes} votes={votes}/>
                )}
                <Stack direction="row" justifyContent={"space-evenly"}>
                    <button onClick={() => navigate('/SearchPolls')}>Back</button>
                    <button onClick={submitVotes}>Submit</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </Stack>
            </Stack>
        </>
    )
}

function ShowQuestion(props: question | any) {

    type vote = {
        question: number,
        answer: number
    }

    const changeVote = (question: number, answer: number) => {
        props.setVotes([
            ...props.votes.filter((v: vote) => v.question !== question), {
            question: question,
            answer: answer
        }]);
    }

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={2}>
                <Typography>{props.ques.question}</Typography>
                <Divider variant="middle"/>
                <Stack direction="row" spacing={5} justifyContent="space-around" alignItems="center">
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[0].answer}</Typography>
                        <button onClick={() => {changeVote(props.question, 0)}}>Vote</button>
                    </Stack>
                    <Typography variant='h1'>OR</Typography>
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[1].answer}</Typography>
                        <button onClick={() => {changeVote(props.question, 1)}}>Vote</button>
                    </Stack>
                </Stack>
            </Stack>
            
        </Paper>
    )
}