import { useNavigate } from "react-router-dom";
import { poll, useAuthContext } from "../context/context";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import './ManagePolls.css';
import Button from "@mui/material/Button";


export default function ManagePolls(){
    const navigate = useNavigate();

    const { ID } = useAuthContext();

    const [polls, setPolls] = useState<poll[]>([]);
    const [open, setOpen] = useState(true);

    const getPolls = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URI}/polls/owner/${ID}`).then((response) => {
            setPolls(response.data);
            handleClose();
        }).catch((error) => {
            handleClose();
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
        <div className="manage-polls">
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1>Your Polls</h1>
            <Stack spacing={2}>
                {polls.map((poll, index) => 
                    <ListPoll key={index} poll={poll}/> 
                )}
            <Button variant="outlined" onClick={() => navigate('/createPoll')}>Create New Poll</Button>
            </Stack>
        </div>   
    )
}

function ListPoll(props: poll | any){

    const navigate = useNavigate();


    return (
         <Paper sx={{ m: 2, p: 2 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Stack spacing={2}>
                    <Typography variant="h5">{props.poll.pollName}</Typography>
                    <Typography>ID: {props.poll._id}</Typography>
                </Stack>
                <Typography>{props.poll.pollDesc}</Typography>
                <Stack spacing={1}>
                    <Button variant="outlined" onClick={() => navigate('/viewPoll', {state: props.poll})}>View Poll</Button>
                    <Button variant="outlined" onClick={() => alert("Sorry, This feature is not implemented yet")}>Edit Poll</Button>
                </Stack>
            </Stack>
        </Paper>
    )
}