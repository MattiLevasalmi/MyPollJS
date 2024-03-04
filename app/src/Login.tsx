import { useAuthContext } from "./context";

export default function Login(){

    //const { setAuthToken, setType } = useAuthContext(); Causes error -- investigate more...

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
        
    }

    return(
        <div>
            <form onSubmit={submitLogin}>
                <p><input type="email" id="email" required></input></p>
                <p><input type="password" id="password" required></input></p>
                <p><button type="submit">Login</button></p>
            </form>
        </div>
    )
}