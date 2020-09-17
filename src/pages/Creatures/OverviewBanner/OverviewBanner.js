// import React from 'react';
import SpeciesItem from "./SpeciesItem/SpeciesItem";
import './OverviewBanner.css';
import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1120,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
      ],
    };
    const Species = [1, 2, 3, 4];
    return (
      <Slider {...settings} className="container-species">
        {Species.map((e, index) => {
          return <SpeciesItem isReverse={index % 2 === 0} key={e} />;
        })}
      </Slider>
    );
  }
}
