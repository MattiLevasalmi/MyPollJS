import { useNavigate } from "react-router-dom";
import { Divider, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper"
import HomeIcon from '@mui/icons-material/Home';
import "./Header.css";

interface HeaderProps {
    title: string,
    subtitle: string
}

export default function Header({title, subtitle}: HeaderProps) {

    const navigate = useNavigate();

    return(
        <Paper>
            <div className="header">
                <h1>{title}</h1>
                <Divider orientation="vertical" variant="middle" sx={{ mr: 5 }}/>
                <h2>{subtitle}</h2>
                <IconButton className="icon-button" onClick={() => navigate('/')}> <HomeIcon /> </IconButton>
            </div>
        </Paper>
    );
}