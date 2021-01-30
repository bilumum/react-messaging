import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import './userCard.css';

class UserCard extends React.Component{
    render(){
        // const profileURL = this.props.URL || 'https://www.placecage.com/48/48';
        
        return (
            <div className="userCard">
                <Avatar></Avatar>
                <div className="userInfo">
                    <span className="userInfo__userName">Ümit Altuntaş</span>
                    <span className="userInfo__conversationText">Son konuşmadan bir kesit olacak burada....</span>
                </div>
            </div>
        );
    }
}

export default UserCard;