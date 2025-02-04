import Grid from '@mui/material/Grid2';
import Stack from "@mui/material/Stack";
import { poll, useAuthContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import picOne from '../images/blackSquare.png'
import './Start.css'

export default function Start() {
    return(
        <>
            <div className='sectionOne'>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 12, lg: 5}}>
                        <img src={picOne}/>
                    </Grid>
                    <Grid size={{xs: 12, md: 12, lg: 6}}>
                        <AnswerPoll/>
                    </Grid>
                </Grid>
            </div>
            <div className='sectionTwo'>
                <ManagePoll/>
            </div>
        </>
    )
}

function AnswerPoll() {

    const navigate = useNavigate();
    const [polls, setPolls] = useState<poll>();
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const joinPoll = (event: React.SyntheticEvent) => {
        event.preventDefault();
        handleOpen();
        const form = event.target as typeof event.target & {
            pollId: {value: string}
        };
        const pollId = form.pollId.value;
        goToPoll(pollId);
    }

    const goToPoll = (pollId: string) => {
        axios.get(`https://pollapi.vercel.app/polls/${pollId}`).then((response) => {
            setPolls(response.data);
            handleClose();
            setSuccess(true);
            console.log("hello");
        }).catch((error) => {
            console.log("ello");
            console.log(error);
        })
    }

    useEffect(() => {
        if (success){
            navigate('/answerPoll', {state: polls})
        }
    },[success]);
   
    return (
        <>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <>
                <Typography variant='h3'>Answer a Poll</Typography>
                <Grid container spacing={2}>
                    <Grid size={{xs: 6}}>
                        <Typography variant='body1'>Here you can enter a poll id to be taken to the poll's answering page</Typography>
                        <form onSubmit={joinPoll}>
                            Enter Poll ID: <input type="text" id="pollId" required></input>
                            <button type="submit">Join Poll</button>
                        </form>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Typography variant='body1'>Or you can click "Search for a Poll" to see a list of all the public polls</Typography>
                        <button onClick={() => navigate('/searchPolls')}>Search for a Poll</button>
                    </Grid>
                </Grid>
            </>
        </>
    )
}

function ManagePoll() {

    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    const managePollPage = () => {
        if (authToken == "")
            navigate('/Login', {state: '/managePolls'})
        else
            navigate('/managePolls')
    }

    const createPollPage = () => {
        if (authToken == "")
            navigate('/Login', {state: '/createPoll'})
        else
            navigate('/createPoll')
    }

    return (
        <>
            <Typography variant='h3'>Manage Polls</Typography>
            <Typography variant='body1'>Here you can create a new poll to be shared with the world</Typography>
            <Typography variant='body1'>You can also view the results of your existing polls or edit them if needed</Typography>
            <Stack direction="row" justifyContent="space-evenly">
                <button onClick={managePollPage}>Manage your Polls</button>
                <button onClick={createPollPage}>Create new Poll</button>
            </Stack>
            <Typography variant='body1'>If you are not logged in already, you will be taken to a login page</Typography>
        </>
    )
}