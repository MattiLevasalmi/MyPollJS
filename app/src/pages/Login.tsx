import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/context";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './Login.css';

export default function Login(){

    const { setAuthToken, setID } = useAuthContext();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const submitLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            email: {value: string},
            password: {value: string}
        };
        const email = form.email.value;
        const password = form.password.value;
        handleOpen();
        doLogin(email, password);
    }
    
    const doLogin = (email: string, password: string) => {
        axios.post(`http://localhost:3000/login`, {
            email: email, password: password
        }).then((response) => {
            setAuthToken(response.data.token);
            setID(response.data.id);
            handleClose();
            setIsLoginSuccess(true);
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

    useEffect(() => {
        if (isLoginSuccess) {
            navigate(state);
        }
    }, [isLoginSuccess]);

    return(
        <div>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper className="logpaper">
                <h1>Login to MyPollJS</h1>
                <form onSubmit={submitLogin}>
                    <Stack>
                        <TextField type="email" id="email" placeholder="email" required />
                        <TextField type="password" id="password" placeholder="password" required />
                    </Stack>
                    <Stack direction="row" justifyContent="space-around">
                        <Button variant="outlined" type="submit">Login</Button>
                        <Button variant="outlined" onClick={() => navigate('/register', {state: state})}>Go to Registration</Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    )
}