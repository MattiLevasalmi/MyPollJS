import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


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
        axios.post("http://localhost:3000/register", {
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
        <div>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <button onClick={() => navigate('/')}>Home</button>
            <h1>Register to Polls R Us</h1>
            <form onSubmit={submitRegister}>
                <p><input type="username" id="username" required></input></p> 
                <p><input type="email" id="email" required></input></p>
                <p><input type="password" id="password" required></input></p>
                <p><button type="submit">Register</button></p>
            </form>
        </div>
    )
}