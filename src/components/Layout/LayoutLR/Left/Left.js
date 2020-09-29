import React from 'react';
import './Left.css';

const left = props => {
    return (
        <div className="left">
            {props.children}
        </div>
    );
} 

export default left;