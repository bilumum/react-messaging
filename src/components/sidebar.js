import React from 'react';
import CurrentUser from './currentUser';
import UserCardList from './userCardList'

class SideBar extends React.Component{
    render(){
        return (
            <div className="sidebar">
                <CurrentUser></CurrentUser>
                <UserCardList></UserCardList>                
            </div>
        );
    }
}

export default SideBar;