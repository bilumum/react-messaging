import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SideBar from './components/sidebar';

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
  
  function Chat() {
    const classes = useStyles();
    return (
      <Container maxWidth="lg" className="app-container">
        <Grid container className="app-container__layout">
          <Grid item xs={3}>
              <SideBar></SideBar>
          </Grid>
          <Grid item xs={9}>
              <Grid container className="message-container">
                <Grid item xs={12} className="message-container__chatArea">
                  <Paper className={classes.paper}>Chat Area</Paper>
                </Grid>
                <Grid item xs={12} className="message-container__messageArea">
                  <Paper className={classes.paper}>Message Area</Paper>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default Chat;