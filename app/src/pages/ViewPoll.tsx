import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { question } from "../context/context";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import './ViewPoll.css';
import Grid from "@mui/material/Grid2";


export default function ViewPoll() {
    
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="ViewPoll">
            <h1>{state.pollName}</h1>
            <Stack spacing={3}>
                
                {state.questions.map((question: any, index: number) =>
                    <ShowQuestion key={index} ques={question}/>
                )}
                <Stack direction="row" spacing={2}>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </Stack>
            </Stack>
        </div>
    )
}

function ShowQuestion(props: question | any) {
    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={2}>
                <Typography>{props.ques.question}</Typography>
                <Divider variant="middle"/>
                <Grid container>
                    <Grid size={5}>
                        <Stack spacing={1}>
                            <Typography>{props.ques.answers[0].answer}</Typography>
                            <Typography>{props.ques.answers[0].count}</Typography>
                        </Stack>
                    </Grid>
                    <Grid size={2}>
                        {props.ques.answers[0].count == props.ques.answers[1].count ? 
                            <Typography variant="h2">{"="}</Typography> :
                            props.ques.answers[0].count > props.ques.answers[1].count ?
                                <Typography variant="h2">{">"}</Typography> :
                                <Typography variant="h2">{"<"}</Typography>
                        }
                    </Grid>
                    <Grid size={5}>
                        <Stack spacing={1}>
                            <Typography>{props.ques.answers[1].answer}</Typography>
                            <Typography>{props.ques.answers[1].count}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            
        </Paper>
    )
}