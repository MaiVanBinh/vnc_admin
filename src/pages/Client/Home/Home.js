import React from "react";
import './Home.css';
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

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
