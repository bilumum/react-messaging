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
    //const [currentUser, setCurrentUser] = useState(props.location.state);

    useEffect(() => {
      console.log("useEffect running...");
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

      return () => {
        console.log("UseEffect CLEARED....");
        Socket.off('NEW_JOIN', handleNewJoins);
      };
        
    }, [needUpdate]);

    function handleNewJoins(message) {
      console.log(message);
      setNeedUpdate(true);
    }

    console.log("Socket Status:" + Socket.connected);

    return (
      <Container maxWidth="lg" className="app-container">
        <Grid container className="app-container__layout">
          <Grid item xs={3}>
              <SideBar onlineUsers={onlineUsers} currentUser={currentUser}></SideBar>
          </Grid>
          <Grid item xs={9}>
              <Grid container className="message-container">
                <Grid item xs={12} className="message-container__chatArea">
                  <ChatConversation></ChatConversation>
                </Grid>
                <Grid item xs={12} className="message-container__messageArea">
                  <ChatMessage></ChatMessage>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default Chat;