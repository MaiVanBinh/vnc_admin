import React from "react";
import Slider from "react-slick";
import "./FooterSlider.css";
const footerSlider = (props) => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
  };
  return (
    <Slider {...settings}>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
        <div className="footer-img"><img src="http://vncreatures.net/pictures/animal/6121.JPG" alt="" /></div>
    </Slider>
  );
};
export default footerSlider;
