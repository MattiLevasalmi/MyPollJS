import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context";
//import { IconButton } from "@mui/material";
//import { Closeicon } from "@mui/icons-material" run 'npm install @mui/icon-material' (may be wrong)

export default function Login(){

    const { setAuthToken, setType } = useAuthContext();
    const navigate = useNavigate();
    const { state } = useLocation();

    const submitLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            email: {value: string},
            password: {value: string}
        };
        const email = form.email.value;
        const password = form.password.value;
        doLogin(email, password);
    }

    const doLogin = (email: string, password: string) => {
        if (email == "admin@polls.com" && password == "completelySafe") {
            setAuthToken("Zebra");
            setType("Owner");
            navigate(state)
        }
        else if (email == "user@coldmail.com" && password == "notSafe") {
            setAuthToken("Lepard");
            setType("User");
            navigate(state)
        }
        else {
            window.alert("Incorrect email or password")
        }
    }

    return(
        <div>
            <button onClick={() => navigate('/')}>Home</button>
            <h1>Login to Polls R Us</h1>
            <form onSubmit={submitLogin}>
                <p><input type="email" id="email" required></input></p>
                <p><input type="password" id="password" required></input></p>
                <p><button type="submit">Login</button></p>
            </form>
        </div>
    )
}