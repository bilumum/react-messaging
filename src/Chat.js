/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
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

    const [onlineUsers, _setOnlineUsers] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [toUser, _setToUser] = useState("");
    const [conversation, _setConversation] = useState([]);
    const [allConversation, _setAllConversation] = useState([]);

    const onlineUsersRef = useRef(onlineUsers);
    const toUserRef = useRef(toUser);
    const allConversationRef = useRef([]);
    const conversationRef = useRef([]);

    const setOnlineUsers = data => {
      onlineUsersRef.current = data;
      _setOnlineUsers(data);
    };

    const setToUser = data => {
      toUserRef.current = data;
      _setToUser(data);
    };

    const setAllConversation = data => {     
      allConversationRef.current = data;
      _setAllConversation(data); 
    };

    const setConversation = data => {    
      conversationRef.current = data;
      _setConversation(data); 
    };
    
    useEffect(() => {
      if(needUpdate){
        const fetchData = async () => {
          let users = await getOnlineUsers();
          users = users.filter(item => item.userId !== currentUser.userId);
          console.log(onlineUsers);
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

      let currentConversation = allConversationRef.current.find(c => c.toUser === userId);

      if(!currentConversation){
        setAllConversation([{
          toUser: userId,
          messages: []
        }, ...allConversationRef.current]);

        setConversation([]);
      }
      else{
        currentConversation.messages.map( message => message.isRead = true);
        setConversation([...currentConversation.messages]);
      }
    }

    function handleSendMessage(message) {
      Socket.emit("PRIVATE_MESSAGE", {
        to: this.toUser,
        message: message
      });

      setConversation([{  
        message: message,
        fromUserId: currentUser.userId,
        toUserId: toUser,
        date: new Date()
      }, ...conversationRef.current]);

      let _allConversation = [...allConversationRef.current];
      let currentConversation = _allConversation.find(c => c.toUser === toUser);
      currentConversation.messages = [...conversationRef.current];

      setAllConversation(_allConversation);
    }

    function handleComingMessage(message) {

      if(message.userId === toUserRef.current){
        setConversation([{  
          message: message.message,
          fromUserId: message.userId,
          toUserId: currentUser.userId,
          date: new Date(),
          isRead: true
        }, ...conversationRef.current]);
      }
    
      if(!allConversationRef.current) allConversationRef.current = [];

      let _allConversation = [...allConversationRef.current];
      let userConversation = _allConversation.find(c => c.toUser === message.userId );
      if(!userConversation){
        userConversation = {
          toUser: message.userId,
          messages: []
        }

        _allConversation.push(userConversation);
      }

      userConversation.messages.unshift({  
        message: message.message,
        fromUserId: message.userId,
        toUserId: currentUser.userId,
        date: new Date(),
        isRead: message.userId === toUserRef.current
      });

      setAllConversation(_allConversation);
    }

    console.log("Socket Status:" + Socket.connected);

    return (
      <Container maxWidth="md" className="app-container">
        <Grid container className="app-container__layout">
          <Grid item xs={4}>
              <SideBar onlineUsers={onlineUsers} currentUser={currentUser} conversations={allConversation} handleUserSelect={handleConversationSelection}></SideBar>
          </Grid>
          <Grid item xs={8} style={{height:"100%"}}>
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