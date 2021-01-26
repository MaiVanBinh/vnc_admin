import React, { useState, useEffect } from "react";
import "./Layout.css";
// import Aux from "../../hoc/Auxiliary";
// import Navbar from "../Navbar/Navbar";
import PageRouter from "../../router/PageRouter";
import { useHistory } from "react-router";
// import Footer from "../Footer/Footer";
// import Authentication from "../Authentication/Authentication";
// import BackDrop from "../../components/UI/Backdrop/Backdrop";
import { useSelector } from 'react-redux';
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";
import Loader from './../UI/Loader/Loader';

const Layout = () => {
    // const [isLogin, setIsLogin] = useState(false);
    // const onLoginHandler = () => {
    //   setIsLogin(isLogin => !isLogin);
    // }

    // const token = useSelector(state => state.auth.token);

    // useEffect(() => {
    //   if(token) {
    //     setIsLogin(false);
    //   }
    // }, [token]);
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
            {/* <Navbar onLoginHandler={onLoginHandler}/> */}
            {/* {isLogin ? (
        <div>
          <BackDrop show={isLogin} clicked={onLoginHandler} />
          <Authentication />
        </div>
      ) : null} */}

            <div className={"admin-side-bar active"}>
                <SideBarAdmin page={page} setPage={setPage} />
            </div>
            <div style={{ marginLeft: '300px', transition: "0.5s ease-in-out" }}>
                <div className="container-layout">
                    <PageRouter />
                </div>
            </div>

            {/* Đặt loader global và trigger bằng 1 state trong redux, bất kể khi nào có fetching thì change state ->true->false */}
            {
                loader ? <Loader /> : null
            }
            
            {/* <div className="container-layout">
        <PageRouter />
      </div> */}
            {/* <Footer /> */}
        </>
    );
};

export default Layout;
