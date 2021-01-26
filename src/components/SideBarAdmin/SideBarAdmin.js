import React, { useState } from "react";
import "./SideBarAdmin.css";
import Logo from "../../assets/banner.png";
import { useHistory } from "react-router";

const SideBarAdmin = (props) => {
    const {
        page, setPage
    } = props;
    const history = useHistory();

    const changePage = (pageRoute) => {
        history.push(pageRoute);
        if(pageRoute === '/bai-viet') setPage(1);
        else setPage(0);
    }

    return (
        <div className="main-menu-container">
            <div className="logo-admin">
                <img src={Logo} alt="" />
            </div>
            <div className={page === 0 ? "menu-item active" : "menu-item"} onClick={() => changePage('/danh-muc')}>
                <span className="icon">
                    <svg viewBox="0 0 480 480" width="20" height="20">
                        <path
                            fill="#333333"
                            d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
                        ></path>
                    </svg>
                </span>
                <span>Danh mục</span>
            </div>
            <div className={page === 1 ? "menu-item active" : "menu-item"} onClick={() => changePage('/bai-viet')}>
                <span className="icon">
                    <svg viewBox="0 0 480 480" width="20" height="20">
                        <path
                            fill="#333333"
                            d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
                        ></path>
                    </svg>
                </span>
                <span>Bài viết</span>
            </div>
            
            {/* <div className={props.type === 5 ? "menu-item active" : "menu-item"} onClick={() => props.changeType(5)}>
                <span className="icon">
                    <svg viewBox="0 0 480 480" width="20" height="20">
                        <path
                            fill="#333333"
                            d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z"
                        ></path>
                    </svg>
                </span>
                <span>Admin Manager</span>
            </div> */}

        </div>
    );
};

export default SideBarAdmin;
