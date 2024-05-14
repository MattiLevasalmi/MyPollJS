import { useLocation, useNavigate } from "react-router-dom";
import { question } from "./context";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";


export default function AnswerPoll(){

    type vote = {
        question: number,
        answer: number
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    const [votes, setVotes] = useState<vote[]>([]);

    const submitVotes = () => {
        console.log(votes);
    }

    return (
        <>
            <h1>{state.pollName}</h1>
            <Stack spacing={3}>
                {state.questions.map((question: any, index: number) =>
                    <ShowQuestion ques={question} question={index} setVotes={setVotes} votes={votes}/>
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

    const vote = (question: number, answer: number) => {
        props.setVotes([
            ...props.votes, {
            question: question,
            answer: answer
        }]);
    }

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={2}>
                <Typography>{props.ques.question} {props.question}</Typography>
                <Divider variant="middle"/>
                <Stack direction="row" spacing={5} justifyContent="space-around" alignItems="center">
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[0].answer}</Typography>
                        <button onClick={() => {vote(props.question, 0)}}>Vote</button>
                    </Stack>
                    <Typography variant='h1'>OR</Typography>
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[1].answer}</Typography>
                        <button onClick={() => {vote(props.question, 1)}}>Vote</button>
                    </Stack>
                </Stack>
            </Stack>
            
        </Paper>
    )
}