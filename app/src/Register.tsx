import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context";
import axios from "axios";


export default function Register() {
    //const { setAuthToken, setType } = useAuthContext();
    const navigate = useNavigate();
    const { state } = useLocation();

    const submitRegister = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as typeof event.target & {
            email: {value: string},
            password: {value: string}
        };
        const email = form.email.value;
        const password = form.password.value;
        doRegister(email, password);
    }

    const doRegister = (email: string, password: string) => {
        axios.post("http://localhost:3000/register", {
            email: email, password: password
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <button onClick={() => navigate('/')}>Home</button>
            <h1>Register to Polls R Us</h1>
            <form onSubmit={submitRegister}>
                <p><input type="email" id="email" required></input></p>
                <p><input type="password" id="password" required></input></p>
                <p><button type="submit">Register</button></p>
            </form>
        </div>
    )
}