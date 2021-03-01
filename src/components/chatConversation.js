import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const conversationContainerStyle = {
    width: "100%",
    height: "100%"
}

function ChatConversation(){

    return (
        <Box style={conversationContainerStyle}></Box>
    );
   
}

export default ChatConversation;