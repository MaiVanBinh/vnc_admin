import React from "react";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import AuthenticationButton from "./loginBtn/loginBtn";
import SearchLatin from "./SearchLatin/SearchLatin";

const Navbar = (props) => {
  return (
    <header>
      <div className="container-nav">
        <input type="checkbox" name="" id="check" />
        <Logo />
        <div className="nav-btn">
          <NavigationItems />
          <AuthenticationButton onLoginHandler={props.onLoginHandler} />
        </div>
        <SearchLatin />

        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
