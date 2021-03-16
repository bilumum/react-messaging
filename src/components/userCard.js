/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import './userCard.css';
import Badge from '@material-ui/core/Badge';



class UserCard extends React.Component{

    handleClick = () => {
        this.props.handleSelect(this.props.userId);
    }

    render(){       
        var profile = this.props;
        let avatar_url = `https://ui-avatars.com/api/?name=${profile.name}+${profile.surname}&size=48`;
        let unReadMessageCount = () => {
            let count = undefined;
            if(this.props.conversation){
                if(this.props.conversation.messages){
                    count = this.props.conversation.messages.filter(message => message.isRead === false).length;
                }
            }

            return count;
        }

        let latestConversationMessage = () => {
            let message = "";
            if(this.props.conversation){
                if(this.props.conversation.messages && this.props.conversation.messages.length > 0){
                    message = this.props.conversation.messages[0].message;
                }
            }

            return message;
        }
        
        return (
            <div className="userCard" data-selected={this.props.isSelected} onClick={this.handleClick}>
                <Avatar URL={avatar_url}></Avatar>
                <Badge badgeContent={unReadMessageCount()} color="secondary">
                    <div className="userInfo">
                        <span className="userInfo__userName">{profile.name} {profile.surname}</span>
                        <span className="userInfo__conversationText">{latestConversationMessage()}</span>
                    </div>
                </Badge>
            </div>
        );
    }
}

export default UserCard;