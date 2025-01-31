import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Paper, Stack, TextField } from "@mui/material";
import './Register.css';


export default function Register() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [open, setOpen] = useState(false);

    const submitRegister = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            username: {value: string},
            email: {value: string},
            password: {value: string}
        };
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        handleOpen();
        doRegister(username, email, password);
    }

    const doRegister = (username: string, email: string, password: string) => {
        axios.post(`http://localhost:3000/register`, {
            username: username, email: email, password: password
        }).then((response) => {
            handleClose();
            console.log(response);
            navigate('/Login', {state: state});
        }).catch((error) => {
            handleClose();
            console.log(error);
        })
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div className="register">
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper className="regpaper">
                <h1>Register to MyPollJS</h1>
                <form onSubmit={submitRegister}>
                    <Stack>
                        <TextField type="username" id="username" placeholder="username" required />
                        <TextField type="email" id="email" placeholder="email" required />
                        <TextField type="password" id="password" placeholder="password" required />
                    </Stack>
                    <Stack direction="row" justifyContent="space-around">
                        <Button variant="outlined" type="submit">Register</Button>
                        <Button variant="outlined" onClick={() => navigate('/login', {state: state})}>Go to Login</Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    )
}