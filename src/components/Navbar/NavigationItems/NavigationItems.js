import React from "react";
import "./NavigationItems.css";

const navigationItem = (props) => {
  return (
    <div className="nav-links">
      <ul>
        <li className="nav-link">
          <a href="/">
            Trang chủ
          </a>
        </li>
        <li className="nav-link">
          <a href="/sinh-vat">
            Sinh Vật<i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown">
            <ul>
              <li className="dropdown-link">
                <a href="/sinh-vat/sach-do?species=1">Sách đỏ</a>
              </li>
              <li className="dropdown-link">
                <a href="/sinh-vat">Mẫu gỗ</a>
              </li>
              <div className="arrow"></div>
            </ul>
          </div>
        </li>
        {/* <li className="nav-link">
          <a href="/bai-viet">
            Bài viết<i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown">
            <ul>
              <li className="dropdown-link">
                <a href="/bai-viet/danh-phap">Danh Pháp</a>
              </li>
              <li className="dropdown-link">
                <a href="/bai-viet/cach-viet-bao-cao-khoa-hoc">
                  Cách viết báo cáo khoa học
                </a>
              </li>
              <div className="arrow"></div>
            </ul>
          </div>
        </li> */}
        <li className="nav-link">
          <a href="/vuon-quoc-gia">
            Vườn quốc gia
          </a>
        </li>
        <li className="nav-link">
          <a href="/lien-he">
            Liên hệ
          </a>
        </li>
        <li className="nav-link">
          <a href="/admin">
            Admin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default navigationItem;
