/* eslint-disable react/prop-types */
import React from 'react';
import CurrentUser from './currentUser';
import UserCardList from './userCardList'

class SideBar extends React.Component{
    render(){

        const onlineUsers = this.props.onlineUsers;
        const currentUser = this.props.currentUser;

        return (
            <div className="sidebar">
                <CurrentUser {...currentUser}></CurrentUser>
                <UserCardList onlineUsers={onlineUsers}></UserCardList>                
            </div>
        );
    }
}

export default SideBar;