import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { poll } from "./context";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useEffect, useState } from "react";


export default function SearchPolls(){
    const navigate = useNavigate();

    const [polls, setPolls] = useState<poll[]>([]);

    const getPolls = () => {
        axios.get("http://localhost:3000/polls").then((response) => {
            setPolls(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getPolls();
    },[]);

    return(
        <>
            <h1>Polls</h1>
            <Stack spacing={2}>
                {polls.map((poll) => 
                    <ListPoll poll={poll}/> 
                )}
            <button onClick={() => navigate('/')}>Home</button>
            
            </Stack>
        </>   
    )
}

function ListPoll(props: poll | any){

    const navigate = useNavigate();


    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-around">
                    <Typography>Name: {props.poll.pollName}</Typography>
                    <Typography>ID: {props.poll.pollId}</Typography>
                </Stack>
                <Typography>Description: {props.poll.pollDesc}</Typography>
                <Divider variant="middle" />
                <button onClick={() => navigate('/answerPoll', {state: props.poll})}>Answer Poll</button>
            </Stack>
        </Paper>
    )
}