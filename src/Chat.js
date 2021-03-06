/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from './components/sidebar';
import ChatMessage from './components/chatMessage';
import ChatConversation from './components/chatConversation';
import Socket from './api/socket';
import {getOnlineUsers} from './api/Api';
import { PinDropSharp } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { Redirect, Route, NavLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
      height: '100%'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }));
  
  function Chat(props) {
    const classes = useStyles();
    const history = useHistory();
    const currentUser = history.location.user;

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [toUser, setToUser] = useState("");
    const [conversation, setConversation] = useState([]);
    
    useEffect(() => {
      if(needUpdate){
        const fetchData = async () => {
          let users = await getOnlineUsers();
          users = users.filter(item => item.userId !== currentUser.userId)
          setOnlineUsers(users);
        };

        setNeedUpdate(false);
        fetchData();
      }

      Socket.on("NEW_JOIN", handleNewJoins);
      Socket.on("PRIVATE_MESSAGE", handleComingMessage);

      return () => {
        Socket.off('NEW_JOIN', handleNewJoins);
        Socket.off('PRIVATE_MESSAGE', handleComingMessage);
      };
        
    }, [needUpdate]);

    function handleNewJoins(message) {
      setNeedUpdate(true);
    }

    function handleConversationSelection(userId){
      setToUser(userId);
      setConversation([]);
    }

    function handleSendMessage(message) {
      Socket.emit("PRIVATE_MESSAGE", {
        to: this.toUser,
        message: message
      });

      setConversation(conversation => [{  
        message: message,
        fromUserId: currentUser.userId,
        toUserId: toUser.userId,
        date: new Date()
      }, ...conversation]);
    }

    function handleComingMessage(message) {
      console.log("Socket ComingMessage: " + JSON.stringify(message));
     
      setConversation(conversation => [{  
        message: message.message,
        fromUserId: message.userId,
        toUserId: currentUser.userId,
        date: new Date()
      }, ...conversation]);
    }

    console.log("Socket Status:" + Socket.connected);

    return (
      <Container maxWidth="lg" className="app-container">
        <Grid container className="app-container__layout">
          <Grid item xs={3}>
              <SideBar onlineUsers={onlineUsers} currentUser={currentUser} handleUserSelect={handleConversationSelection}></SideBar>
          </Grid>
          <Grid item xs={9}>
              <Grid container className="message-container">
                <Grid item xs={12} className="message-container__chatArea">
                  <ChatConversation toUser={toUser} currentUser={currentUser} conversation={conversation}></ChatConversation>
                </Grid>
                <Grid item xs={12} className="message-container__messageArea">
                  <ChatMessage toUser={toUser} handleSendMessage={handleSendMessage}></ChatMessage>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default Chat;