/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import './userCard.css';


class UserCard extends React.Component{

    handleClick = () => {
        this.props.handleSelect(this.props.userId);
    }

    render(){       
        var profile = this.props;
        let avatar_url = `https://ui-avatars.com/api/?name=${profile.name}+${profile.surname}&size=48`;

        return (
            <div className="userCard" data-selected={this.props.isSelected} onClick={this.handleClick}>
                <Avatar URL={avatar_url}></Avatar>
                <div className="userInfo">
                    <span className="userInfo__userName">{profile.name} {profile.surname}</span>
                    <span className="userInfo__conversationText">Son konuşmadan bir kesit olacak burada....</span>
                </div>
            </div>
        );
    }
}

export default UserCard;