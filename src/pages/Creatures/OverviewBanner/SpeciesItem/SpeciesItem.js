import React from 'react';
import image from '../../../../assets/Species/animal.jpg';
import './SpeciesItem.css';

const speciesItem = (props) => {
    return(
        <div className={props.isReverse ? "card row" : "card reverse"}>
            <div className="imgBx">
                <img src={image} alt="" />
            </div>
            <div className="contentBx">
                <div className="content">
                    <h2>Động vật</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat culpa officiis saepe, animi magni quo repellat voluptates quibusdam, a rem maxime dolor porro nostrum neque itaque, id dolorum! Eligendi, totam?</p>
                    <a href="#0">Đọc thêm</a>
                </div>
            </div>
        </div>
    );
}

export default speciesItem;
