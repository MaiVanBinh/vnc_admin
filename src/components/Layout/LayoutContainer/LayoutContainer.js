import React from 'react';
import './LayoutContainer.css';

const layoutContainer = props => {
    return (
        <div className="lr-container ">
            {props.children}
        </div>
    );
} 

export default layoutContainer;