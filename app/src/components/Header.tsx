import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper"
import "./Header.css";

interface HeaderProps {
    title: string,
    subtitle: string
}

export default function Header({title, subtitle}: HeaderProps) {
    return(
        <Paper>
            <div className="header">
                <h1>{title}</h1>
                <Divider orientation="vertical" variant="middle" sx={{ mr: 5 }}/>
                <h2>{subtitle}</h2>
            </div>
        </Paper>
    );
}