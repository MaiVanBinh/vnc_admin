import React from "react";
const ThucVat = (props) => {
    console.log(props.plants)
  const plants = [];
  for (let i = 0; i < props.plants.length; i += 2) {
    plants.push(
      <div class="thucvat-cards">
        <a href={`/sinh-vat/${props.plants[i].id}`}>
        <div class="card-leftside">
          <div class="img-fluid tv-img">
            <img src={props.plants[i].avatar} />
          </div>
          <div class="tv-card card-describe-tv1">
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
        <div class="card-rightside">
          <div class="tv-card card-describe-tv2">
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
          <div class="img-fluid tv-img">
            <img src={props.plants[i + 1].avatar} />
          </div>
        </div>
        </a>
      </div>
    );
  }
  return (
    <div class="thucvat">
      <div class="container container-thucvat">
        <div class="caption caption-thucvat">
          <h2>
            <span>Thực vật</span>
          </h2>
        </div>
        <div class="wrapper-thucvat-cards">
            {plants}
          <a href="#" class="btn-slide btn-prev">
            <i class="fas fa-chevron-left"></i>
          </a>
          <a href="#" class="btn-slide btn-next">
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        <a href="#" class="btn-main btn-main-thucvat">
          <span>Tra cứu thực vật</span>
        </a>
      </div>
    </div>
  );
};
export default ThucVat;
