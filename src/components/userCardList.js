/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './userCard';
import { useRadioGroup } from '@material-ui/core';

class UserCardList extends React.Component{
    
    state = { selectedUser: -1 };

    handleSelect = (userId) => {      
        this.setState({
            selectedUser: userId
        });
      
        this.props.handleUserSelect(userId);
    }

    render(){
        const onlineUsers = this.props.onlineUsers;
        console.log(this.props);
        if (onlineUsers.length > 0) {
            return (
                <div>
                    {onlineUsers.map(profile => {
                        let isSelected = profile.userId === this.state.selectedUser;
                        let conversation = {};
                        if(this.props.conversations){
                            conversation = this.props.conversations.find(c => c.toUser === profile.userId);
                        }
                        return <UserCard key={profile.userId} conversation={conversation} isSelected={isSelected} handleSelect={this.handleSelect} {...profile}></UserCard>
                        })
                    }
                </div>
            );
        }
        else{
            return (
                <div style={{width:'100%',textAlign:'center'}}>
                    <span>Waiting for people....</span>
                </div>
            );
        }
    }
}

export default UserCardList;