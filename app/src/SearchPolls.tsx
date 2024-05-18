import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { poll } from "./context";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


export default function SearchPolls(){
    const navigate = useNavigate();

    const [polls, setPolls] = useState<poll[]>([]);
    const [open, setOpen] = useState(true);

    const getPolls = () => {
        axios.get("https://pollapi.vercel.app/polls").then((response) => {
            setPolls(response.data);
            handleClose();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getPolls();
    },[]);

    return(
        <>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1>Polls</h1>
            <Stack spacing={2}>
                {polls.map((poll, index) => 
                    <ListPoll key={index} poll={poll}/> 
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
                    <Typography>ID: {props.poll._id}</Typography>
                </Stack>
                <Typography>Description: {props.poll.pollDesc}</Typography>
                <Divider variant="middle" />
                <button onClick={() => navigate('/answerPoll', {state: props.poll})}>Answer Poll</button>
            </Stack>
        </Paper>
    )
}