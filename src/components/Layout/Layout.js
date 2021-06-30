import React, { useState, useEffect } from "react";
import "./Layout.css";
import PageRouter from "../../router/PageRouter";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";
import { IconLogout } from "../../store/utilities/SVG";
import * as actionTypes from "./../../store/actions/actionTypes";
import {colors} from '../../store/utilities/contants';

const Layout = () => {
  const [page, setPage] = useState(0); // 0: danh-muc, 1: bai-viet
  const history = useHistory();
  const [sideBarActive, setSidebarActive] = useState(true);
  const auth = useSelector((state) => state.auth);
  // const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.token !== null) {
      history.push("/danh-muc");
    }
  }, [history, auth]);

  const logoutHandle = () => {
    localStorage.removeItem("autobi-auth");
    localStorage.removeItem("expirationDate");
    dispatch({ type: actionTypes.LOG_OUT });
  };

  return (
    <>
      <div
        className="top-menu d-flex justify-content-between align-items-center"
        style={{
          width: "100%",
        }}
      >
        <div
          className="group-btn"
          onClick={() => setSidebarActive(!sideBarActive)}
        >
          <div className="logo-admin">
            <a href="/" target="_blank" style={{ textDecoration: "none" }}>
              <h3>VNCREATURES</h3>
            </a>
          </div>
        </div>
        <div className="group-btn" onClick={logoutHandle}>
          <IconLogout width={15} height={15} color={colors.top_menu.primary} />
          {/* <span className="ml-2">Đăng xuất</span> */}
        </div>
      </div>

      <div
        style={{
          marginLeft: sideBarActive ? "300px" : "0px",
          transition: "0.5s ease-in-out",
        }}
      >
        <div className="container-layout">
          <div className={"admin-side-bar " + (sideBarActive ? "active" : "")}>
            <SideBarAdmin page={page} setPage={setPage} />
          </div>
          <PageRouter />
        </div>
      </div>
    </>
  );
};

export default Layout;
