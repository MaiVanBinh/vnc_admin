import React from "react";
import './Home.css';
import { Redirect } from "react-router-dom";

const Home = (props) => {
  return (
    <Redirect
      to={{
        pathname: "/signin"
      }}
    />
  );
};

export default Home;
