import React from "react";
import './Introduction.css';

const introduction = (props) => (
    <div className="introduction-search">
        <h2>Động vật rừng Việt Nam</h2>
        <p>
            (Hơn {props.introduction.creatureNum} loài thuộc các họ, bộ, nhóm khác nhau)
            <br />
            Cập nhật {props.introduction.lastUpdated}
        </p>
    </div>
);

export default introduction;