import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom"
import { question } from "./context";
import { useState } from "react";
import Button from "@mui/material/Button";


export default function CreatePoll(){

    const navigate = useNavigate();

    const [ questions ] = useState<question[]>([])

    const addQuestion = (event: React.SyntheticEvent) => {
        event.preventDefault();
        alert("Submitted");
    }

    return(
        <>
            <h1>Create a New Poll</h1>
            <Paper sx={{ m: 2, p: 2 }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <TextField id="pollName" label="Poll Name" variant="outlined"/>
                        <TextField id="pollDesc" label="Poll Description" variant="outlined" multiline/>
                    </Stack>
                    <Divider variant="middle" />
                    <TextField id="question" label="Question" variant="outlined"/>
                    <Stack direction="row" spacing={2}>
                        <TextField id="Answer1" label="Answer One" variant="outlined"/>
                        <TextField id="Answer2" label="Answer Two" variant="outlined"/>
                    </Stack>
                    <Button variant="outlined">Add Question</Button>
                </Stack>
            </Paper>
            <Question />
            <button onClick={() => navigate('/')}>Home</button>
        </>
    )
}

function Question() {
    
    
    return(
        <Paper>
            
        </Paper>
    )
}