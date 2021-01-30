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
    color: 'white',
    fontSize: '12px'
}
  

class CurrentUser extends React.Component{
    render(){
        // const profileURL = this.props.URL || 'https://www.placecage.com/48/48';
        
        return (
            <div style={divStyle}>
                <Avatar></Avatar>
                <span style={userName}>Ümit Altuntaş</span>
            </div>
        );
    }
}

export default CurrentUser;