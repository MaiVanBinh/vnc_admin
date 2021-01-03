import React from "react";
import "./Animal.css";

const Animal = (props) => {
  let animals = [];
  for (let i = 0; i < props.animals.length; i += 3) {
    animals.push(
      <div class="dongvat-cards" key={i}>
        <a href={`/sinh-vat/${props.animals[i].id}`}>
          <div class="card-left">
            <div class="img-fluid dv-img">
              <img src={props.animals[i].avatar} alt=""/>
            </div>
            <div class="card-describe">
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
          <div class="card-mid">
            <div class="img-fluid dv-img">
              <img src={props.animals[i + 1].avatar} alt=""/>
            </div>
            <div class="card-describe">
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
          <div class="card-right">
            <div class="img-fluid dv-img">
              <img src={props.animals[i + 2].avatar} alt=""/>
            </div>
            <div class="card-describe">
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
        {/* <a href="#" class="btn-slide btn-prev"><i class="fas fa-chevron-left"></i></a>
				      <a href="#" class="btn-slide btn-next"><i class="fas fa-chevron-right"></i></a> */}
      </div>
    );
  }
  return (
    <div class="dongvat">
      <div class="container container-dongvat">
        <div class="caption caption-dongvat">
          <h2>
            <span>Động vật</span>
          </h2>
        </div>
        <div class="wrapper-dongvat-cards">{animals}</div>
        <a href="/#" class="btn-main btn-main-dongvat">
          <span>Tra cứu động vật</span>
        </a>
      </div>
    </div>
  );
};
export default Animal;
