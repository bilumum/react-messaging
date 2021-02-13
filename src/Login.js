import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {addUserToChat} from './api/Api';

import { useHistory } from "react-router-dom";
import { Redirect, Route, NavLink } from "react-router-dom";

const btnStyle = {
    float: 'right'
}

const formMargin = {
    marginBottom: '20px'
}

const containerStyle = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    minHeight: '100vh'
}

function Login(){

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [alertOpen, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    let history = useHistory();

    function validateForm() {
        return name.length > 0 && surname.length > 0;
    }

    const handleClick = async() => {
        try{
            setOpen(false);
            var result = await addUserToChat({ name: name, surname: surname });
            setLoggedIn(true);
            console.log(result);
            history.push("/chat");
        }
        catch(err){
            console.log(err);
            setOpen(true);
            setError(err.toString());
        }
    }

    return(
        <Container maxWidth="xs" style={containerStyle}>
            <h1>#CometoChat</h1>
            <Collapse in={alertOpen}>
                <Alert  style={formMargin} severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"                    
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                {error}
                </Alert>
            </Collapse>
            <TextField id="txtName" 
                label="Name" 
                fullWidth 
                style={formMargin}
                onChange={(e) => setName(e.target.value)}
                />
            <TextField id="txtSurname" 
                label="Surname" 
                fullWidth 
                style={formMargin}
                onChange={(e) => setSurname(e.target.value)}
                />
            <Button variant="contained" color="primary" style={btnStyle} disabled={!validateForm()} onClick={handleClick}>
                Join Chat
            </Button>

            {/* { loggedIn ? <Redirect to="/chat" /> : null } */}
        </Container>
    );

}

export default Login;