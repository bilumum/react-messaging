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
import Socket from './api/socket';
import { PinDropSharp } from '@material-ui/icons';

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

    let history = useHistory();

    function validateForm() {
        return name.length > 0 && surname.length > 0;
    }

    const handleClick = async() => {
        try{
            setOpen(false);
            var result = await addUserToChat({ name: name, surname: surname });
            console.log(result);
            Socket.auth = result;
            Socket.connect();
           
            //history.push("/chat");

            history.push({ 
                pathname: '/chat',
                user: result
            });
               
        }
        catch(err){
            console.log(err);
            setOpen(true);
            setError(err.toString());
        }
    }

    return(
        <Container maxWidth="xs" style={containerStyle}>
            <h1 style={{textAlign:'center'}}>#CometoChat</h1>
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
        </Container>
    );

}

export default Login;