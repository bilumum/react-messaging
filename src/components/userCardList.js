import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './userCard';

 
const testData = [
    {name: "Muhittin Noylan", avatar_url: "https://ui-avatars.com/api/?name=Muhittin+Noylan&size=48", company: "@facebook"},
    {name: "Özge Altuntaş", avatar_url: "https://ui-avatars.com/api/?name=Özge+Altuntaş&size=48", company: "Humu"},
    {name: "Atakan Altuntaş", avatar_url: "https://ui-avatars.com/api/?name=Atakan+Altuntaş&size=48", company: "Facebook"},
];
 

class UserCardList extends React.Component{
    render(){
       
        return (
            <div>
                {testData.map(profile => <UserCard key={1} {...profile}></UserCard>)}
            </div>
        );
    }
}

export default UserCardList;