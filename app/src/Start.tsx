import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import './Start.css'

export default function Start() {
    return(
        <>
            <h6></h6>
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
    return (
        <Paper className="paper">
            <Typography variant='h3'>Answer a Poll</Typography>
        </Paper>
    )
}

function ManagePoll() {
    return (
        <Paper className="paper">
            <Typography variant='h3'>Manage Polls</Typography>
        </Paper>
    )
}