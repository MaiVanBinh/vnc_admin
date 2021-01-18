import React from "react";
import "./Animal.css";

const Animal = (props) => {
  let animals = [];
  for (let i = 0; i < props.animals.length; i += 3) {
    animals.push(
      <div className="dongvat-cards" key={i}>
        <a href={`/sinh-vat/${props.animals[i].id}`}>
          <div className="card-left">
            <div className="img-fluid dv-img">
              <img src={props.animals[i].avatar} alt=""/>
            </div>
            <div className="card-describe">
              <ul>
                <li>
                  Tên Việt Nam:{" "}
                  <span id="name1">{props.animals[i].name_vn} </span>
                </li>
                <li>
                  Tên Latin:{" "}
                  <span id="name2">{props.animals[i].name_latin} </span>
                </li>
                <li>
                  Họ: <span>{props.animals[i].family_vn} </span>
                </li>
                <li>
                  Bộ: <span>{props.animals[i].order_vn} </span>
                </li>
                <li>
                  Lớp (nhóm):{" "}
                  <span id="group">{props.animals[i].group_vn} </span>
                </li>
              </ul>
            </div>
          </div>
        </a>
        <a href={`/sinh-vat/${props.animals[i + 1].id}`}>
          <div className="card-mid">
            <div className="img-fluid dv-img">
              <img src={props.animals[i + 1].avatar} alt=""/>
            </div>
            <div className="card-describe">
              <ul>
                <li>
                  Tên Việt Nam:{" "}
                  <span id="name1">{props.animals[i + 1].name_vn} </span>
                </li>
                <li>
                  Tên Latin:{" "}
                  <span id="name2">{props.animals[i + 1].name_latin} </span>
                </li>
                <li>
                  Họ: <span>{props.animals[i + 1].family_vn} </span>
                </li>
                <li>
                  Bộ: <span>{props.animals[i + 1].order_vn} </span>
                </li>
                <li>
                  Lớp (nhóm):{" "}
                  <span id="group">{props.animals[i + 1].group_vn} </span>
                </li>
              </ul>
            </div>
          </div>
        </a>
        <a href={`/sinh-vat/${props.animals[i + 2].id}`}>
          <div className="card-right">
            <div className="img-fluid dv-img">
              <img src={props.animals[i + 2].avatar} alt=""/>
            </div>
            <div className="card-describe">
              <ul>
                <li>
                  Tên Việt Nam:{" "}
                  <span id="name1">{props.animals[i + 2].name_vn} </span>
                </li>
                <li>
                  Tên Latin:{" "}
                  <span id="name2">{props.animals[i + 2].name_latin} </span>
                </li>
                <li>
                  Họ: <span>{props.animals[i + 2].family_vn} </span>
                </li>
                <li>
                  Bộ: <span>{props.animals[i + 2].order_vn} </span>
                </li>
                <li>
                  Lớp (nhóm):{" "}
                  <span id="group">{props.animals[i + 2].group_vn} </span>
                </li>
              </ul>
            </div>
          </div>
        </a>
        {/* <a href="#" className="btn-slide btn-prev"><i className="fas fa-chevron-left"></i></a>
				      <a href="#" className="btn-slide btn-next"><i className="fas fa-chevron-right"></i></a> */}
      </div>
    );
  }
  return (
    <div className="dongvat">
      <div className="container container-dongvat">
        <div className="caption caption-dongvat">
          <h2>
            <span>Động vật</span>
          </h2>
        </div>
        <div className="wrapper-dongvat-cards">{animals}</div>
        <a href="/sinh-vat?species=1" className="btn-main btn-main-dongvat">
          <span>Tra cứu động vật</span>
        </a>
      </div>
    </div>
  );
};
export default Animal;
