import React, { useState, useEffect } from "react";
import "./Layout.css";
import PageRouter from "../../router/PageRouter";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";
import { IconLogout, IconMenu2 } from "../../store/utilities/SVG";
import * as actionTypes from "./../../store/actions/actionTypes";

const Layout = () => {
  const [page, setPage] = useState(0); // 0: danh-muc, 1: bai-viet
  const history = useHistory();
    const [sideBarActive, setSidebarActive] = useState(true);
  const auth = useSelector((state) => state.auth);
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.token !== null) {
      history.push("/danh-muc");
    }
  }, []);

  const logoutHandle = () => {
    localStorage.removeItem("autobi-auth");
    localStorage.removeItem("expirationDate");
    dispatch({ type: actionTypes.LOG_OUT });
  };

  return (
    <>
      <div className={"admin-side-bar " + (sideBarActive ? "active" : '')}>
        <SideBarAdmin page={page} setPage={setPage} />
      </div>
      <div style={{ marginLeft: sideBarActive ? "300px" : '0px', transition: "0.5s ease-in-out" }}>
        <div className="top-menu d-flex justify-content-between align-items-center" style={{left: sideBarActive ? '300px' : '0px',  transition: "0.5s ease-in-out"}}>
          <div className="group-btn" onClick={() => setSidebarActive(!sideBarActive)}>
            <IconMenu2 width={15} height={15} color={"#333"} />
          </div>
          <div className="group-btn" onClick={logoutHandle}>
            <IconLogout width={15} height={15} color={"#333"} />
            <span className="ml-2">Đăng xuất</span>
          </div>
        </div>
        <div className="container-layout">
          <PageRouter />
        </div>
      </div>
    </>
  );
};

export default Layout;
