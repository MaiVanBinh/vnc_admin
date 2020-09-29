import React from 'react';
import "./Navbar.css";
import {NavLink} from 'react-router-dom';
const navbar =  () => {
    return(
        <header>
            <div className="container-nav">
                <input type="checkbox" name="" id="check" />
                
                <div className="logo-container">
                    <h3 className="logo">Vn<span>Creatures</span></h3>
                </div>

                <div className="nav-btn">
                    <div className="nav-links">
                        <ul>
                            <li className="nav-link">
                                <NavLink exact to="/">Trang chủ</NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink to="/sinh-vat">Sinh Vật<i className="fas fa-caret-down"></i></NavLink>
                                <div className="dropdown">
                                    <ul>
                                        <li className="dropdown-link">
                                            <NavLink to="/sinh-vat/sach-do?species=1">Sách đỏ</NavLink>
                                        </li>
                                        <li className="dropdown-link">
                                            <NavLink to="/sinh-vat">Mẫu gỗ</NavLink>
                                        </li>
                                        <div className="arrow"></div>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-link">
                                <NavLink to="/bai-viet">Bài viết<i className="fas fa-caret-down"></i></NavLink>
                                <div className="dropdown">
                                    <ul>
                                        <li className="dropdown-link">
                                            <NavLink to="/bai-viet/danh-phap">Danh Pháp</NavLink>
                                        </li>
                                        <li className="dropdown-link">
                                            <NavLink to="/bai-viet/cach-viet-bao-cao-khoa-hoc">Cách viết báo cáo khoa học</NavLink>
                                        </li>
                                        <li className="dropdown-link">
                                            <NavLink to="#">Bài viết</NavLink>
                                        </li>
                                        <div className="arrow"></div>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-link">
                                <NavLink exact to="/vuon-quoc-gia">Vườn quốc gia</NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink exact to="/lien-he">Liên hệ</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="hamburger-menu-container">
                    <div className="hamburger-menu">
                        <div></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default navbar;