import React from "react";
import "./AdminSideBar.css";

const AdminSideBar = (props) => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Tài Khoản</span>
          </a>
        </li>
        <li className="active">
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Sinh vật</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Loài</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Nhóm</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Bộ</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Họ</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Tác giả</span>
          </a>
        </li>
        <li>
          <a href="#0">
            <span className="icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <span className="title">Từ điển</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
