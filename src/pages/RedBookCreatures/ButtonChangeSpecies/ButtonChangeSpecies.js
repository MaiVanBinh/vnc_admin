import React from 'react';
import './ButtonChangeSpecies.css';
import ButtonCustom from '../../../components/UI/ButtonCustom/ButtonCustom';
const ButtonChangeSpecies = (props) => {
    const btnContent = [
        {
            id: 1,
            title: 'Động vật',
            link: '/sinh-vat/sach-do?loai=1'
        },
        {
            id: 2,
            title: 'Thực vật',
            link: '/sinh-vat/sach-do?loai=2'
        },
        {
            id: 3,
            title: 'Côn trùng',
            link: '/sinh-vat/sach-do?loai=3'
        }
    ]
    return(
        <div className="species-boxbtn">
            {btnContent.map(btn => <ButtonCustom title={btn.title} key={btn.id} click={() => {props.changeSpeciesHandler(btn.id)}} />)}
        </div>
    );
}

export default ButtonChangeSpecies;