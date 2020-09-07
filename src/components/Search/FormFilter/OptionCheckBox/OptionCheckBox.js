import React from 'react';

const optionCheckBox = (props) => {
    return (
        <li>
            <input class="filter" data-filter=".check1" type="checkbox" id="checkbox1" />
            <label class="checkbox-label" for="checkbox1">{props.title}</label>
        </li>
    );
}

export default optionCheckBox;