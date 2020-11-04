import React from "react";
import "./loginBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../../store/actions/index';

const LoginBtn = (props) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div className="log-sign">
      {token ? (
        <button className="btn transparent" onClick={() => dispatch(logout())}>
          Đăng xuất
        </button>
      ) : (
        <button className="btn transparent" onClick={props.onLoginHandler}>Đăng Nhập</button>
      )}
    </div>
  );
};

export default LoginBtn;
