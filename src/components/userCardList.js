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
        console.log(this.props);
        this.props.handleUserSelect(userId);
    }

    render(){
        const onlineUsers = this.props.onlineUsers;
        
        if (onlineUsers.length > 0) {
            return (
                <div>
                    {onlineUsers.map(profile => {
                        let isSelected = profile.userId === this.state.selectedUser;
                        return <UserCard key={profile.userId} isSelected={isSelected} handleSelect={this.handleSelect} {...profile}></UserCard>
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