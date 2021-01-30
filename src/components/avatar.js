import React from 'react';
import PropTypes from 'prop-types';

const divStyle = {
    width: '48px',
    height: '48px',
    border: 'solid 2px green',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '10px'
  };
  

class Avatar extends React.Component{
    render(){
        const profileURL = this.props.URL || 'https://www.placecage.com/48/48';
        
        return (
            <div style={divStyle}>
                <img src={profileURL}></img>
            </div>
        );
    }
}

Avatar.propTypes = {
    URL: PropTypes.string
}

export default Avatar;