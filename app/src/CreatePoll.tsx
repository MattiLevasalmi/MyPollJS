import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom"
import { question } from "./context";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";


export default function CreatePoll(){

    const navigate = useNavigate();

    const [ questions ] = useState<question[]>([])

    const addQuestion = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            questionId: {value: string},
            answerOne: {value: string},
            answerTwo: {value: string}
        };
        const question = form.questionId.value;
        const answerOne = form.answerOne.value;
        const answerTwo = form.answerTwo.value;
        questions.push({
            question: question,
            answers: [{answer: answerOne, count: 0}, {answer: answerTwo, count: 0}]
        })
    }

    const addPoll = (event: React.SyntheticEvent) => {
        event.preventDefault();
        alert("Submitted Poll");
    }

    return(
        <>
            <h1>Create a New Poll</h1>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Paper sx={{ m: 2, p: 2 }}>
                        <form onSubmit={addPoll}>
                            <Stack spacing={2}>
                                <TextField id="pollName" label="Poll Name" variant="outlined" required/>
                                <TextField id="pollDesc" label="Poll Description" variant="outlined" multiline rows={3}/>
                                <Divider variant="middle" />
                                <Button variant="outlined" type="submit">Create Poll</Button>
                            </Stack>
                        </form>
                    </Paper>
                    <Paper sx={{ m: 2, p: 2 }}>
                        <form onSubmit={addQuestion}>
                            <Stack spacing={2}>
                                <TextField id="questionId" label="Question" variant="outlined" required/>
                                <Stack direction="row" spacing={2}>
                                    <TextField id="answerOne" label="Answer One" variant="outlined" required/>
                                    <TextField id="answerTwo" label="Answer Two" variant="outlined" required/>
                                </Stack>
                                <Button variant="outlined" type="submit">Add Question</Button>
                            </Stack>
                        </form>
                    </Paper>
                </Stack>
                <Grid container spacing={2}>
                    {questions.map((question) => 
                        <Grid xs={12} md={6}>
                            <Question ques={question}/>
                        </Grid>)}
                </Grid>
                
            </Stack>
            <button onClick={() => navigate('/')}>Home</button>
        </>
    )
}

function Question(props: question | any) {
    console.log(props.ques);
    
    return(
        <Paper>
            <Typography>{props.ques.question}</Typography>
        </Paper>
    )
}