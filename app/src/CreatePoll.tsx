import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom"
import { question, useAuthContext } from "./context";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


export default function CreatePoll(){

    const navigate = useNavigate();
    const { ID, setID, setAuthToken } = useAuthContext();

    const [ questions, setQuestions ] = useState<question[]>([])
    const [createSuccess, setCreateSuccess] = useState(false);
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [open, setOpen] = useState(false);

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
        setQuestions([
            ...questions, {
            question: question,
            answers: [{answer: answerOne, count: 0}, {answer: answerTwo, count: 0}]
        }])
    }

    const addPoll = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            pollName: {value: string},
            pollDesc: {value: string}
        }
        const pollName = form.pollName.value;
        const pollDesc = form.pollDesc.value;
        handleOpen();
        postPoll(pollName, pollDesc, questions);
    }

    const postPoll = (pollName: string, pollDesc: string, questions: question[]) => {
        axios.post("https://pollapi.vercel.app/polls", {
            pollName: pollName, ownerID: ID, pollDesc: pollDesc, questions: questions
        }).then((response) => {
            console.log(response);
            handleClose();
            setCreateSuccess(true);
        }).catch((error) => {
            handleClose();
            console.log(error);
        })
    }

    const logout = () => {
        setAuthToken("");
        setID("");
        setLogoutSuccess(true);
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (createSuccess){
            navigate('/managePolls');
        }
    }, [logoutSuccess]);

    useEffect(() => {
        if (logoutSuccess){
            navigate('/');
        }
    }, [logoutSuccess]);

    return(
        <>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                {questions.map((question, index) =>     
                    <Question key={index} ques={question}/>
                )}
                <Stack direction="row" justifyContent="space-around">
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => logout()}>Log Out</button>
                </Stack>
            </Stack>
        </>
    )
}

function Question(props: question | any) {
    
    return(
        <Paper>
            <Typography>Question: {props.ques.question}</Typography>
            <Typography>Answers:</Typography>
            <Stack direction="row" justifyContent="space-around">
                
                <Typography>{props.ques.answers[0].answer}</Typography>
                <Typography>Or</Typography>
                <Typography>{props.ques.answers[1].answer}</Typography>
            </Stack>
        </Paper>
    )
}