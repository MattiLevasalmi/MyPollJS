import { useLocation, useNavigate } from "react-router-dom";
import { question } from "./context";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function AnswerPoll(){

    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <>
            <h1>{state.pollName}</h1>
            <Stack spacing={3}>
                {state.questions.map((question: any) =>
                    <ShowQuestion ques={question}/>
                )}
                <Stack direction="row" spacing={2}>
                    <button onClick={() => navigate('/SearchPolls')}>Back</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </Stack>
            </Stack>
        </>
    )
}

function ShowQuestion(props: question | any) {

    const vote = () => {
        //to be implemented with backend
    }

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={2}>
                <Typography>{props.ques.question}</Typography>
                <Divider variant="middle"/>
                <Stack direction="row" spacing={5} justifyContent="space-around" alignItems="center">
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[0].answer}</Typography>
                        <button onClick={vote}>Vote</button>
                    </Stack>
                    <Typography variant='h1'>OR</Typography>
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[1].answer}</Typography>
                        <button onClick={vote}>Vote</button>
                    </Stack>
                </Stack>
            </Stack>
            
        </Paper>
    )
}