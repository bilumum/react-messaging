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

  function ChatMessage(params) {
      
    const classes = getStyles();

    return (
        <TextField
        className={classes.root}
        id="outlined-multiline-static"
        label=""
        multiline
        rows={3}
        defaultValue=""
        placeholder="Start typing..."
        variant="outlined"
        fullWidth
        />
    );
}

export default ChatMessage;