import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import './Start.css'
import { useAuthContext } from './context';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function Start() {
    return(
        <>
            <h1>Welcome to Polls R Us</h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <AnswerPoll/>
                </Grid>
                <Grid item xs={6}>
                    <ManagePoll/>
                </Grid>
            </Grid>
        </>
    )
}

function AnswerPoll() {

    const navigate = useNavigate();
    const { polls } = useAuthContext();

    const joinPoll = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            pollId: {value: number}
        };
        const pollId = form.pollId.value;
        goToPoll(pollId);
    }

    const goToPoll = (pollId: number) => {
        navigate('/MyPollJS/AnswerPoll', {state: polls[pollId-1]})
    }

    return (
        <Paper className="paper">
            <Typography variant='h3'>Answer a Poll</Typography>
            <Typography variant='body1'>Here you can enter a poll id to be taken to the polls answering page</Typography>
            <Typography variant='body1'>Or you can click "Search for a Poll" to see a list of all the public polls</Typography>
            <form onSubmit={joinPoll}>
                Enter Poll ID: <input type="number" id="pollId" required></input>
                <button type="submit">Join Poll</button>
            </form>
            <button onClick={() => navigate('/MyPollJS/searchPolls')}>Search for a Poll</button>
        </Paper>
    )
}

function ManagePoll() {

    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    const managePollPage = () => {
        if (authToken == "")
            navigate('/MyPollJS/Login', {state: '/MyPollJS/managePolls'})
        else
            navigate('/MyPollJS/managePolls')
    }

    const createPollPage = () => {
        if (authToken == "")
            navigate('/MyPollJS/Login', {state: '/MyPollJS/createPoll'})
        else
            navigate('/MyPollJS/createPoll')
    }

    return (
        <Paper className="paper">
            <Typography variant='h3'>Manage Polls</Typography>
            <Typography variant='body1'>Here you can create a new poll to be shared with the world</Typography>
            <Typography variant='body1'>You can also view the results of your existing polls or edit them if needed</Typography>
            <Stack direction="row" justifyContent="space-evenly">
                <button onClick={managePollPage}>Manage your Polls</button>
                <button onClick={createPollPage}>Create new Poll</button>
            </Stack>
            <Typography variant='body1'>If you are not logged in already, you will be taken to a login page</Typography>
        </Paper>
    )
}