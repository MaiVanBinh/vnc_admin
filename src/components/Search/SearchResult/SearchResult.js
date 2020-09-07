import React from 'react';
import "./SearchResult.css";
import Introduction from './Introduction/Introduction';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introduction: {
                creatureNum: 2000,
                lastUpdated: '10-10-2020'
            },
            creatures: [
                {
                    id: 1,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/mNDwHGz/5970s.jpg"
                },
                {
                    id: 2,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/Pr4YZs1/6121s.jpg"
                },
                {
                    id: 3,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/tHzWLH3/a89ce08dc81d108a9160493113bd6c31cf3d70f942b7b-Vb2-Tq-C.jpg"
                },
                {
                    id: 4,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/w4z6xSf/back.jpg"
                },
                {
                    id: 5,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/M6mHsFC/TPJ0-LBBHQ-U0164-N94-XPH-f846202080f2-512.jpg"
                },
                {
                    id: 6,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/M6mHsFC/TPJ0-LBBHQ-U0164-N94-XPH-f846202080f2-512.jpg"
                },
                {
                    id: 7,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/M6mHsFC/TPJ0-LBBHQ-U0164-N94-XPH-f846202080f2-512.jpg"
                },
                {
                    id: 8,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/M6mHsFC/TPJ0-LBBHQ-U0164-N94-XPH-f846202080f2-512.jpg"
                },
                {
                    id: 9,
                    name_vn: "RÙA BIỂN ĐẦU TO",
                    name_latin: "Caretta caretta",
                    family: "Vích Cheloniidae",
                    set: "Rùa Testudinata",
                    class: "Bò sát",
                    imageUrl: "https://i.ibb.co/M6mHsFC/TPJ0-LBBHQ-U0164-N94-XPH-f846202080f2-512.jpg"
                }
            ]
        }
    }
    render() {
        let creaturesList = null;
        if(this.state.creatures && this.state.creatures.length > 0) {
            creaturesList = this.state.creatures.map(creature => (
                <div className="card" key={creature.id}>
                    <div className="imgBox">
                        <img src={creature.imageUrl} alt="" />
                    </div>
                    <div className="content">
                        <h2 style={{color: "#006600"}}>{creature.name_vn}</h2>
                        <p><span>Tên Latin:</span> <span style={{color: "#990000"}}><i>{creature.name_latin}</i></span></p>
                        <p><span>Họ:</span> <span><b>{creature.family}</b></span></p>
                        <p><span>Bộ:</span> <span><b>{creature.set}</b></span></p>
                        <p><span>Lớp:</span> <span><b>{creature.class}</b></span></p>
                    </div>
                    <h2 className="name" style={{color: "#006600"}}>{creature.name_vn}</h2>
                </div>
            ));
        }

        return (
            <section className={this.props.showFilter ? "cd-gallery filter-is-visible" : "cd-gallery"}>
                <Introduction introduction={this.state.introduction}/>
                <div className="container">
                    {creaturesList}
                </div>
                <div className="cd-fail-message">No results found</div>
            </section>
        );
    }
}

export default SearchResult;