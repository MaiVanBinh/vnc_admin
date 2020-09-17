import React from 'react';
import './HeadingTitle.css';

const HeadingTitle = (props) => {
    let style;
    switch(props.mode) {
        case 'heading':
            style = 'heading';
            break;
        case 'subHeading':
            style = 'sub-heading';
            break;
        default:
            style = 'heading';
    }
    return (
        <div className={style}>
            <h3 style={props.center ? {textAlign: 'center'} : null}>{props.title}</h3>
        </div>
    );
}

export default HeadingTitle;