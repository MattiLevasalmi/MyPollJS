

export default function Login(){

    const submitLogin = () => {
        console.log("login");
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