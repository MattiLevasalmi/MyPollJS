import { useNavigate } from "react-router-dom";


export default function ManagePolls(){
    const navigate = useNavigate();

    return(
        <>
            <h1>Work in Progress</h1>
            <button onClick={() => navigate('/')}>Home</button>
        </>   
    )
}