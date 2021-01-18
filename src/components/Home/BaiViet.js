import React from "react";
const ThucVat = (props) => {
  return (
    <div className="baiviet">
      <div className="container container-baiviet">
        <div className="caption caption-baiviet">
          <h2>
            <span>Bài viết</span>
          </h2>
        </div>
        <div className="container-news">
          <div className="news-left">
            <a href={`/bai-viet/${props.postsNew[0].id}`}>
              <img src={props.postsNew[0].image} alt=""/>
            </a>
            <a href={`/bai-viet/${props.postsNew[0].id}`}>
              <p>{props.postsNew[0].title}</p>
            </a>
          </div>
          <div className="news-right">
            <div className="sub-right news-upper">
              <a href={`/bai-viet/${props.postsNew[1].id}`}>
                <img src={props.postsNew[1].image} alt=""/>
              </a>
              <a href={`/bai-viet/${props.postsNew[1].id}`}>
                <p>{props.postsNew[1].title}</p>
              </a>
            </div>
            <div className="sub-right news-mid">
              <a href={`/bai-viet/${props.postsNew[2].id}`}>
                <img src={props.postsNew[2].image} alt=""/>
              </a>
              <a href={`/bai-viet/${props.postsNew[2].id}`}>
                <p>{props.postsNew[2].title}</p>
              </a>
            </div>
            <div className="sub-right news-under">
              <a href={`/bai-viet/${props.postsNew[3].id}`}>
                <img src={props.postsNew[3].image} alt=""/>
              </a>
              <a href={`/bai-viet/${props.postsNew[3].id}`}>
                <p>{props.postsNew[3].title}</p>
              </a>
            </div>
          </div>
        </div>
        <a href="#" className="btn-main btn-main-news">
          <span>Thông tin mới</span>
        </a>
        <div className="container-nature">
          <div className="sub-nature nature-left">
            <a href={`/bai-viet/${props.postsNatural[0].id}`}>
              <img src={props.postsNatural[0].image} alt=""/>
            </a>
            <a href={`/bai-viet/${props.postsNatural[0].id}`}>
              <p>{props.postsNatural[0].title}</p>
            </a>
          </div>
          <div className="sub-nature nature-mid">
            <a href={`/bai-viet/${props.postsNatural[1].id}`}>
              <img src={props.postsNatural[1].image} alt=""/>
            </a>
            <a href={`/bai-viet/${props.postsNatural[1].id}`}>
              <p>{props.postsNatural[1].title}</p>
            </a>
          </div>
          <div className="sub-nature nature-right">
            <a href={`/bai-viet/${props.postsNatural[2].id}`}>
              <img src={props.postsNatural[2].image} alt=""/>
            </a>
            <a href={`/bai-viet/${props.postsNatural[2].id}`}>
              <p>{props.postsNatural[2].title}</p>
            </a>
          </div>
        </div>
        <a href="#" className="btn-main btn-main-nature">
          <span>Tự nhiên bí ẩn</span>
        </a>
      </div>
    </div>
  );
};

export default ThucVat;
