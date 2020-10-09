// import React from 'react';
import SpeciesItem from "./SpeciesItem/SpeciesItem";
import "./OverviewBanner.css";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { connect, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';

const SimpleSlider = (props) => {
  const { onFetchPost } = props;
  useEffect(() => {
    onFetchPost({category: 7});
  }, [onFetchPost]);
  
  const overviewPost = useSelector(state => state.posts.overview);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300000,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ]
  };
  return (
    <Slider {...settings} className="container-species">
      {overviewPost ? overviewPost.map((overview, index) => {
        return <SpeciesItem isReverse={index % 2 === 0} key={overview.id} overview={overview} />;
      }) : null}
    </Slider>
  );
};

const mapStateToProps = state => {
  return {
    overviews: state.posts.overview
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onFetchPost: (payload) => {
      dispatch(actions.fetchPost(payload));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider);
