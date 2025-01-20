import { useNavigate } from "react-router-dom";
import { poll, useAuthContext } from "../context/context";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


export default function ManagePolls(){
    const navigate = useNavigate();

    const { ID, setID, setAuthToken } = useAuthContext();

    const [polls, setPolls] = useState<poll[]>([]);
    const [open, setOpen] = useState(true);
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const getPolls = () => {
        axios.get(`http://localhost:3000/polls/owner/${ID}`).then((response) => {
            setPolls(response.data);
            handleClose();
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

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getPolls();
    },[]);

    useEffect(() => {
        if (logoutSuccess) {
            navigate('/');
        }
    }, [logoutSuccess]);

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
            <button onClick={() => navigate('/createPoll')}>Create New Poll</button>
            </Stack>
        </div>   
    )
}

function ListPoll(props: poll | any){

    const navigate = useNavigate();


    return (
         <Paper sx={{ m: 2, p: 2 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between">
                <Stack>
                    <Typography>Name: {props.poll.pollName}</Typography>
                    <Typography>ID: {props.poll._id}</Typography>
                    <Typography>Description: {props.poll.pollDesc}</Typography>
                </Stack>
                <Stack spacing={1}>
                    <button onClick={() => navigate('/viewPoll', {state: props.poll})}>View Poll</button>
                </Stack>
            </Stack>
        </Paper>
    )
}