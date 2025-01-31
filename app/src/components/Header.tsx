import { useNavigate } from "react-router-dom";
import { Divider, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper"
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import "./Header.css";
import { useAuthContext } from "../context/context";
import { useEffect, useState } from "react";

interface HeaderProps {
    title: string,
    subtitle: string
}

export default function Header({title, subtitle}: HeaderProps) {

    const navigate = useNavigate();
    const { ID, setID, setAuthToken } = useAuthContext();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const login = () => {
        navigate('/login', {state: '/'});
    }

    const logout = () => {
        setAuthToken("");
        setID("");
        setLogoutSuccess(true);
    }

    
    useEffect(() => {
        if (logoutSuccess) {
            navigate('/');
        }
    }, [logoutSuccess]);


    return(
        <Paper>
            <div className="header">
                <h1>{title}</h1>
                <Divider orientation="vertical" variant="middle" sx={{ mr: 5 }}/>
                <h2>{subtitle}</h2>
                
                { ID == "" 
                ? <IconButton className="account-button" onClick={() => login()}> <LoginIcon /> </IconButton> 
                : <IconButton className="account-button" onClick={() => logout()}> <LogoutIcon /> </IconButton>}
                <IconButton className="home-button" onClick={() => navigate('/')}> <HomeIcon /> </IconButton>
            </div>
        </Paper>
    );
}