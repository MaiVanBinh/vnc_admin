import React, { useEffect, useState } from "react";
import "./Homepage.css";
import DongVat from "./Animal";
import ThucVat from "./ThucVat";
import BaiViet from "./BaiViet";
import { baseUrl } from "../../store/utilities/apiConfig";

const Home = (props) => {
  const [animals, setAnimals] = useState(null);
  const [plants, setPlants] = useState(null);
  const [postsNatural, setPostsNatural] = useState(null);
  const [postsNew, setPostsNew] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => {
    fetch(`${baseUrl}creatures?species=1&page=1&limit=3`)
      .then((res) => res.json())
      .then((data) => setAnimals(data.data.creatures))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`${baseUrl}creatures?species=2&page=6&limit=2`)
      .then((res) => res.json())
      .then((data) => setPlants(data.data.creatures))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`${baseUrl}posts?category=2&limit=4&page=1`)
      .then((res) => res.json())
      .then((data) => setPostsNew(data.data.posts))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}posts?category=1&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => setPostsNatural(data.data.posts))
      .catch((err) => console.log(err));
  }, []);

  const searchCreatures = () => {
    window.location.href=`/sinh-vat?name=${name}`;
  }

  return (
    <div>
      <head>
        <title>VNCREATURES</title>
      </head>
      {/* ------------------------------------------------------------------------------------------- */}
      <div className="banner">
        <div className="container container-banner">
          <div className="banner-caption">
            <h1>
              SINH VẬT RỪNG <span>VIỆT NAM</span>
            </h1>
          </div>
          <div className="banner-search">
            <input
              type="text"
              className="input-search"
              placeholder="Tìm kiếm..."
              onChange={event =>  setName(event.target.value)}
            />
          </div>
          <div className="banner-button">
            <button className="btn btn-primary" onClick={searchCreatures}>Khám phá</button>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------- */}
      <div className="intro">
        <div className="container container-intro">
          <div className="img-fluid intro-img">
            <img src="https://vncreatures.net/forumpic/bird.jpg" alt=""/>
          </div>
          <div className="intro-para">
            <h3>LỜI NÓI ĐẦU</h3>
            <p>
              Hàng chục ngàn năm trước đây, rừng bao phủ khoảng một phần hai
              diện tích bề mặt trái đất. Ngày nay rừng chỉ còn chiếm chưa đầy
              một phần ba diện tích đất liền (tức là khoảng 4 tỉ ha) và đang thu
              hẹp lại rất nhanh trên toàn thế giới. Theo thống kê của Qũy quốc
              tế về bảo vệ thiên nhiên thì hàng tuần có hơn 400.000 ha rừng bị
              phát quang hoặc bị suy thoái. Cây rừng rất quan trọng đối với lợi
              ích của hành tinh chúng ta và giữ vai trò thiết yếu trong việc
              điều hoà các chu trình khí hậu và nước. Lá cây hấp thụ khí
              carbonic (dioxide carbon), một loại chất khí thải ra khi các nhiên
              liệu như củi, dầu, xăng bị đốt cháy, góp phần dẫn đến sự thay đổi
              khí hậu, giúp chúng ta giữ gìn không khí trong lành và làm giảm
              nguy cơ nóng lên của toàn cầu.
            </p>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------- */}
      {animals ? <DongVat animals={animals}></DongVat> : null}
      {/* ------------------------------------------------------------------------------------------- */}
      {plants ? <ThucVat plants={plants}></ThucVat> : null}
      {/* ------------------------------------------------------------------------------------------- */}
      {postsNew && postsNatural ? <BaiViet postsNew={postsNew} postsNatural={postsNatural}></BaiViet> : null}
    </div>
  );
};


export default Home;
