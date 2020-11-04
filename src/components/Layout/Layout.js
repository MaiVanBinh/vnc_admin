import React, { useState, useEffect } from "react";
import "./Layout.css";
import Aux from "../../hoc/Auxiliary";
import Navbar from "../Navbar/Navbar";
import PageRouter from "../../router/PageRouter";
import Footer from "../Footer/Footer";
import Authentication from "../Authentication/Authentication";
import BackDrop from "../../components/UI/Backdrop/Backdrop";
import { useSelector} from 'react-redux';

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onLoginHandler = () => {
    setIsLogin(isLogin => !isLogin);
  }

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if(token) {
      setIsLogin(false);
    }
  }, [token]);
  return (
    <Aux>
      <Navbar onLoginHandler={onLoginHandler}/>
      {isLogin ? (
        <div>
          <BackDrop show={isLogin} clicked={onLoginHandler} />
          <Authentication />
        </div>
      ) : null}

      <div className="container-layout">
        <PageRouter />
      </div>
      <Footer />
    </Aux>
  );
};

export default Layout;
