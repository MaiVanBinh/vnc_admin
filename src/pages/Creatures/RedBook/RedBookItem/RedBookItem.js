import React from "react";
import './RedBookItem.css';
import HeadingTitle from "../../../../components/UI/HeadingTitle/HeadingTitle";
import { Link } from 'react-router-dom';
const RedBookItem = (props) => {
  return (
    <div style={{marginBottom: "100px",}}>
      <HeadingTitle mode="heading" title={props.title} />
      <div
        className="container-species"
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          paddingTop: "10px",
          
        }}
      >
        {props.data
          ? props.data.map((element) => (
              <Link to={`/sinh-vat/${element.id}`}>
                <div className="card">
                  <div className="imgBx">
                    <img src={element.avatar} alt="" />
                  </div>
                  <div className="contentBx">
                    <div className="content">
                      <h2>{element.name_vn}</h2>
                      <h2>{element.name_latin}</h2>
                      <h2>{element.redbook_level}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
      <p className="show-more"><Link to={{
        pathname: "/sinh-vat/sach-do",
        search: "?loai=" + props.mode
      }}>Xem thêm<i className="fa fa-angle-right"></i></Link></p>
    </div>
  );
};

export default RedBookItem;
