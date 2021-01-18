import React from "react";
const ThucVat = (props) => {
  
  const plants = [];
  for (let i = 0; i < props.plants.length; i += 2) {
    plants.push(
      <div className="thucvat-cards" key={i}>
        <a href={`/sinh-vat/${props.plants[i].id}`}>
        <div className="card-leftside">
          <div className="img-fluid tv-img">
            <img src={props.plants[i].avatar} alt={props.plants[i].name_vn} />
          </div>
          <div className="tv-card card-describe-tv1">
            <ul>
              <li>
                Tên Việt Nam: <span id="name1">{props.plants[i].name_vn}</span>
              </li>
              <li>
                Tên Latin: <span id="name2">{props.plants[i].name_latin}</span>
              </li>
              <li>
                Họ: <span>{props.plants[i].family_vn}</span>
              </li>
              <li>
                Bộ: <span>{props.plants[i].order_vn}</span>
              </li>
              <li>
                Lớp (nhóm): <span id="group">{props.plants[i].group_vn}</span>
              </li>
            </ul>
          </div>
        </div>
        </a>
        <a href={`/sinh-vat/${props.plants[i+1].id}`}>
        <div className="card-rightside">
          <div className="tv-card card-describe-tv2">
            <ul>
              <li>
                Tên Việt Nam:{" "}
                <span id="name1">{props.plants[i + 1].name_vn}</span>
              </li>
              <li>
                Tên Latin:{" "}
                <span id="name2">{props.plants[i + 1].name_latin}</span>
              </li>
              <li>
                Họ: <span>{props.plants[i + 1].family_vn}</span>
              </li>
              <li>
                Bộ: <span>{props.plants[i].order_vn}</span>
              </li>
              <li>
                Lớp (nhóm):{" "}
                <span id="group">{props.plants[i + 1].group_vn}</span>
              </li>
            </ul>
          </div>
          <div className="img-fluid tv-img">
            <img src={props.plants[i + 1].avatar} alt={props.plants[i+1].name_vn} />
          </div>
        </div>
        </a>
      </div>
    );
  }
  return (
    <div className="thucvat">
      <div className="container container-thucvat">
        <div className="caption caption-thucvat">
          <h2>
            <span>Thực vật</span>
          </h2>
        </div>
        <div className="wrapper-thucvat-cards">
            {plants}
          {/* <a href="#" className="btn-slide btn-prev">
            <i className="fas fa-chevron-left"></i>
          </a>
          <a href="#" className="btn-slide btn-next">
            <i className="fas fa-chevron-right"></i>
          </a> */}
        </div>
        <a href="/sinh-vat?species=2" className="btn-main btn-main-thucvat">
          <span>Tra cứu thực vật</span>
        </a>
      </div>
    </div>
  );
};
export default ThucVat;
