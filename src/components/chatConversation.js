/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const conversationContainerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    overflow: "auto"
}

const conversationMessageFromContainerStyle = {
    padding: "32px",
    textAlign: "left"
}

const conversationMessageToContainerStyle = {
    padding: "32px",
    textAlign: "right"
}

const conversationMessageToStyle = {
    padding: "13px",
    backgroundColor: "#00ffff38",
    borderRadius: "15px",
    fontSize: "12px",
    display: "inline-flex"
}

const conversationMessageFromStyle = {
    padding: "13px",
    backgroundColor: "rgb(68 71 93 / 13%)",
    borderRadius: "15px",
    fontSize: "12px",
    display: "inline-flex"
}

function ChatConversation(props){
    return (
        <Box style={conversationContainerStyle}>
            {props.conversation.map(message => {
                    if(props.currentUser.userId === message.fromUserId){
                        return <div style={conversationMessageToContainerStyle}>
                            <span style={conversationMessageToStyle}>{message.message}</span>
                        </div>
                    }
                    else if(props.currentUser.userId === message.toUserId){
                        return <div style={conversationMessageFromContainerStyle}>
                            <span style={conversationMessageFromStyle}>{message.message}</span>
                        </div>
                    }
                })
            }
        </Box>
    );
   
}

export default ChatConversation;