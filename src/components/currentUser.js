/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
    paddingLeft: '40px',
    paddingBottom: '20px'
};

const info = {
    display: 'flex'
}

const userName = {
    // color: 'white',
    fontSize: '12px'
}
  

class CurrentUser extends React.Component{
    render(){
        const user = this.props;
        let avatar_url = `https://ui-avatars.com/api/?name=${user.name}+${user.surname}&size=48`;
        
        return (
            <div style={divStyle}>
                <Avatar URL={avatar_url}></Avatar>
                <span style={userName}>{user.name} {user.surname}</span>
            </div>
        );
    }
}

export default CurrentUser;