import React from "react";
import './CreaturesItems.css';
import CreatureItem from './CreatureItem/CreatureItem';
import {Link} from 'react-router-dom'

const creaturesItems = (props) => {
    let creaturesList = null;
    if(props.creatures && props.creatures.length > 0) {
        creaturesList = props.creatures.map(creature => <Link key={creature.id} to={"/sinh-vat/" + creature.id}><CreatureItem creature={creature} /></Link>);
    }
    return (
        <div className="search-result">
            {creaturesList}
        </div>
    );
};

export default creaturesItems;
