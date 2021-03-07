/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const getStyles = makeStyles((theme) => ({
    root: {
      '& .MuiOutlinedInput-root': {       
        border: '0px',
      },
      '& label.Mui-focused': {
        border: '0px',
      },
      '& .MuiInput-underline:after': {
        border: '0px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '0px',
        },
        '&:hover fieldset': {
            border: '0px',
        },
        '&.Mui-focused fieldset': {
            border: '0px',
        },
      },
    },
  }));

  function ChatMessage(props) {
      
    const classes = getStyles();
    let disabled = props.toUser.length > 0 ? false : true;
    let placeholder = props.toUser.length > 0 ? "Start typing..." : "Select a user and start typing..." ;

    function keyPress(e) {
      if(e.keyCode == 13){
        e.preventDefault();
        props.handleSendMessage(e.target.value);
        e.target.value = "";
      }
    }

    return (
        <TextField
        className={classes.root}
        id="outlined-multiline-static"
        label=""
        multiline
        rows={3}
        defaultValue=""
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        disabled={disabled}
        onKeyDown={keyPress}
        />
    );
}

export default ChatMessage;