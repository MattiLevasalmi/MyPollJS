import { useNavigate } from "react-router-dom";
import { poll, useAuthContext } from "./context";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function ManagePolls(){
    const navigate = useNavigate();

    const { polls } = useAuthContext();

    return(
        <>
            <h1>Your Polls</h1>
            <Stack spacing={2}>
                {polls.map((poll) => 
                    <ListPoll poll={poll}/> 
                )}
            
            <Stack direction="row" justifyContent="space-around">
                <button onClick={() => navigate('/MyPollJS')}>Home</button>
                <button onClick={() => navigate('/MyPollJS/createPoll')}>Create New Poll</button>
                <button onClick={() => alert("not yet")}>Log Out</button>
            </Stack>
            
            </Stack>
        </>   
    )
}

function ListPoll(props: poll | any){

    const navigate = useNavigate();

    const editPoll = () => {

    }


    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between">
                <Stack>
                    <Typography>Name: {props.poll.pollName}</Typography>
                    <Typography>ID: {props.poll.pollId}</Typography>
                    <Typography>Description: {props.poll.pollDesc}</Typography>
                </Stack>
                <Stack spacing={1}>
                    <button onClick={() => navigate('/MyPollJS/viewPoll', {state: props.poll})}>View Poll</button>
                    <button onClick={() => editPoll()}>Edit Poll</button>
                </Stack>
            </Stack>
        </Paper>
    )
}