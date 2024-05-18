import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { question } from "./context";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function ViewPoll() {
    
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <h1>{state.pollName}</h1>
            <Stack spacing={3}>
                
                {state.questions.map((question: any, index: number) =>
                    <ShowQuestion key={index} ques={question}/>
                )}
                <Stack direction="row" spacing={2}>
                    <button onClick={() => navigate('/managePolls')}>Back</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </Stack>
            </Stack>
        </>
    )
}

function ShowQuestion(props: question | any) {
    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={2}>
                <Typography>{props.ques.question}</Typography>
                <Divider variant="middle"/>
                <Stack direction="row" spacing={5} justifyContent="space-around" alignItems="center">
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[0].answer}</Typography>
                        <Typography>{props.ques.answers[0].count}</Typography>
                    </Stack>
                    {props.ques.answers[0].count == props.ques.answers[1].count ? 
                        <Typography variant="h2">{"="}</Typography> :
                        props.ques.answers[0].count > props.ques.answers[1].count ?
                            <Typography variant="h2">{">"}</Typography> :
                            <Typography variant="h2">{"<"}</Typography>
                    }
                    <Stack spacing={1}>
                        <Typography>{props.ques.answers[1].answer}</Typography>
                        <Typography>{props.ques.answers[1].count}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            
        </Paper>
    )
}