import React, { useState, useEffect } from "react";
import "./Layout.css";
import PageRouter from "../../router/PageRouter";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";

const Layout = () => {
    const [page, setPage] = useState(0); // 0: danh-muc, 1: bai-viet
    const history = useHistory();

    const auth = useSelector(state => state.auth);
    const loader = useSelector(state => state.loader);

    useEffect(() => {
        if (auth && auth.token !== null) {
            history.push('/danh-muc');
        }
    }, [])
    return (
        <>
            <div className={"admin-side-bar active"}>
                <SideBarAdmin page={page} setPage={setPage} />
            </div>
            <div style={{ marginLeft: '300px', transition: "0.5s ease-in-out" }}>
                <div className="container-layout">
                    <PageRouter />
                </div>
            </div>
        </>
    );
};

export default Layout;
