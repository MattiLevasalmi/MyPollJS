import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

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
        axios.post("https://pollapi.vercel.app/login", {
            email: email, password: password
        }).then((response) => {
            setAuthToken(response.data.access_token);
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
            <button onClick={() => navigate('/')}>Home</button>
            <h1>Login to Polls R Us</h1>
            <form onSubmit={submitLogin}>
                <p><input type="email" id="email" required></input></p>
                <p><input type="password" id="password" required></input></p>
                <p><button type="submit">Login</button></p>
            </form>
            <button onClick={() => navigate('/register')}>Go to Registration</button>
        </div>
    )
}