/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import './userCard.css';


class UserCard extends React.Component{
    render(){
        var profile = this.props;
        return (
            <div className="userCard">
                <Avatar URL={profile.avatar_url}></Avatar>
                <div className="userInfo">
                    <span className="userInfo__userName">{profile.name}</span>
                    <span className="userInfo__conversationText">Son konuşmadan bir kesit olacak burada....</span>
                </div>
            </div>
        );
    }
}

export default UserCard;