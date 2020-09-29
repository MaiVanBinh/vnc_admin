import React from 'react';
import './Right.css';

const right = props => {
    return (
        <div className="right">
            {props.children}
        </div>
    );
} 

export default right;