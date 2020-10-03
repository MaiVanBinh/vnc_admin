import React from 'react';
import './TeamMembers.css';
import Member from './Member/Member';

const TeamMembers = (props) => {

    let content = [];
    
    for(let i = 0; i< 6; i++ ) {
        content.push(<Member key={i} />);
    }
    return(
        <div className="members-list">
            {content}
        </div>
    );
}
export default TeamMembers;