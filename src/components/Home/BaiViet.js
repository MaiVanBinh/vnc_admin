import React, { Component } from "react";
const ThucVat = (props) => {
  return (
    <div class="baiviet">
      <div class="container container-baiviet">
        <div class="caption caption-baiviet">
          <h2>
            <span>Bài viết</span>
          </h2>
        </div>
        <div class="container-news">
          <div class="news-left">
            <a href={`/bai-viet/${props.postsNew[0].id}`}>
              <img src={props.postsNew[0].image} />
            </a>
            <a href={`/bai-viet/${props.postsNew[0].id}`}>
              <p>{props.postsNew[0].title}</p>
            </a>
          </div>
          <div class="news-right">
            <div class="sub-right news-upper">
              <a href={`/bai-viet/${props.postsNew[1].id}`}>
                <img src={props.postsNew[1].image} />
              </a>
              <a href={`/bai-viet/${props.postsNew[1].id}`}>
                <p>{props.postsNew[1].title}</p>
              </a>
            </div>
            <div class="sub-right news-mid">
              <a href={`/bai-viet/${props.postsNew[2].id}`}>
                <img src={props.postsNew[2].image} />
              </a>
              <a href={`/bai-viet/${props.postsNew[2].id}`}>
                <p>{props.postsNew[2].title}</p>
              </a>
            </div>
            <div class="sub-right news-under">
              <a href={`/bai-viet/${props.postsNew[3].id}`}>
                <img src={props.postsNew[3].image} />
              </a>
              <a href={`/bai-viet/${props.postsNew[3].id}`}>
                <p>{props.postsNew[3].title}</p>
              </a>
            </div>
          </div>
        </div>
        <a href="#" class="btn-main btn-main-news">
          <span>Thông tin mới</span>
        </a>
        <div class="container-nature">
          <div class="sub-nature nature-left">
            <a href={`/bai-viet/${props.postsNatural[0].id}`}>
              <img src={props.postsNatural[0].image} />
            </a>
            <a href={`/bai-viet/${props.postsNatural[0].id}`}>
              <p>{props.postsNatural[0].title}</p>
            </a>
          </div>
          <div class="sub-nature nature-mid">
            <a href={`/bai-viet/${props.postsNatural[1].id}`}>
              <img src={props.postsNatural[1].image} />
            </a>
            <a href={`/bai-viet/${props.postsNatural[1].id}`}>
              <p>{props.postsNatural[1].title}</p>
            </a>
          </div>
          <div class="sub-nature nature-right">
            <a href={`/bai-viet/${props.postsNatural[2].id}`}>
              <img src={props.postsNatural[2].image} />
            </a>
            <a href={`/bai-viet/${props.postsNatural[2].id}`}>
              <p>{props.postsNatural[2].title}</p>
            </a>
          </div>
        </div>
        <a href="#" class="btn-main btn-main-nature">
          <span>Tự nhiên bí ẩn</span>
        </a>
      </div>
    </div>
  );
};
export default ThucVat;
