import React from "react";
import "./SideBarAdmin.css";
import Logo from "../../assets/logo.PNG";

const SideBarAdmin = (props) => {
  return (
    <div className="main-menu-container">
      <div className="logo-admin">
        <img src={Logo} alt=""/>
      </div>
      <div className={props.type ===1 ? "menu-item active" : "menu-item"} onClick={() => props.changeType(1)}>
        <span className="icon">
          <svg viewBox="0 0 480 480" width="20" height="20">
            <path
              fill="#333333"
              d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
            ></path>
          </svg>
        </span>
        <span>Creatures</span>
      </div>
      <div className={props.type === 3 ? "menu-item active" : "menu-item"} onClick={() => props.changeType(3)}>
        <span className="icon">
          <svg viewBox="0 0 480 480" width="20" height="20">
            <path
              fill="#333333"
              d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
            ></path>
          </svg>
        </span>
        <span>Posts</span>
      </div>
      <div className={props.type === 4 ? "menu-item active" : "menu-item"} onClick={() => props.changeType(4)}>
        <span className="icon">
          <svg viewBox="0 0 480 480" width="20" height="20">
            <path
              fill="#333333"
              d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
            ></path>
          </svg>
        </span>
        <span>Assets</span>
      </div>
      <div className={props.type === 5 ? "menu-item active" : "menu-item"} onClick={() => props.changeType(5)}>
        <span className="icon">
          <svg viewBox="0 0 480 480" width="20" height="20">
            <path
              fill="#333333"
              d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
            ></path>
          </svg>
        </span>
        <span>Admin Manager</span>
      </div>
      <div className={props.type === "species" || props.type === 'orders' ? "menu-item active" : "menu-item"} onClick={() => props.changeType(2)}>
        <span className="icon">
          <svg viewBox="0 0 480 480" width="20" height="20">
            <path
              fill="#333333"
              d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
            ></path>
          </svg>
        </span>
        <span>Categories</span>
      </div>
      <div className={props.type === "species" ? "sup-menu-item active" : "sup-menu-item"} onClick={() => props.changeType("species")}>
        <span>Species</span>
      </div>
      <div className={props.type === "groups" ? "sup-menu-item active" : "sup-menu-item"} onClick={() => props.changeType("groups")}>
        <span>Groups</span>
      </div>
      <div className={props.type === "orders" ? "sup-menu-item active" : "sup-menu-item"} onClick={() => props.changeType("orders")}>
        <span>Orders</span>
      </div>
      <div className={props.type === "families" ? "sup-menu-item active" : "sup-menu-item"} onClick={() => props.changeType("families")}>
        <span>Family</span>
      </div>
      
    </div>
  );
};

export default SideBarAdmin;
