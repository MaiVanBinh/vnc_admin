import React, { useState } from 'react';
import './DetailHeader.css';

const DetailHeader = (props) => {

    const [imageActive, setImageActive] = useState(0);

    return (
        <div className="intro-box">
                <div className="img-box">
                    <img src={props.creature.images.length > 0 ? props.creature.images[imageActive].url : null} alt="" />
                </div>
                <div className="intro-text">
                    <table>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td className='title'>Tên Việt Nam:</td>
                            <td style={{color: "#006600", fontSize: "18px", fontWeight: "bold"}}>{props.creature.name_vn}</td>
                        </tr>
                        <tr>
                            <td className='title'>Tên Latin:</td>
                            <td style={{color: "#990000", fontStyle: "italic"}}>{props.creature.name_latin}</td>
                        </tr>
                        <tr>
                            <td className='title'>Họ:</td>
                            <td>{props.creature.family_vn}</td>
                        </tr>
                        <tr>
                            <td className='title'>Bộ:</td>
                            <td>{props.creature.order_vn}</td>
                        </tr>
                        <tr>
                            <td className='title'>Lớp(nhóm):</td>
                            <td>{props.creature.group_vn}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="list-image">
                        {props.creature.images.map((image, index) => {
                            let style;
                            if(index === imageActive) {
                                style = 'active';
                            }
                            return (
                                <img src={image.url} alt="" className={style} key={image.id} onMouseMove={() => setImageActive(index)}/>
                            );
                        })}
                    </div>
                </div>
            </div>
    );
}

export default DetailHeader;