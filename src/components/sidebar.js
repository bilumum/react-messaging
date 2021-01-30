import React from 'react';
import CurrentUser from './currentUser';
import UserCard from './userCard'

class SideBar extends React.Component{
    render(){
        return (
            <div className="sidebar">
                <CurrentUser></CurrentUser>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
            </div>
        );
    }
}

export default SideBar;