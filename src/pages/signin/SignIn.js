import React, { useState } from 'react';
import './SignIn.css';
import { login } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import bg from "./../../assets/bg-10.png";
import { useHistory } from 'react-router';
import * as actionTypes from './../../store/actions/actionTypes';

const SignIn = (props) => {
    const [authInfo, setAuthInfo] = useState({
        username: {
            value: "",
            isValid: true,
        },
        password: {
            value: "",
            isValid: true,
        },
    });
    const history = useHistory();

    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const changeAuthInfoHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const username = { ...authInfo.username };
        const password = { ...authInfo.password };
        if (name === 'username') {
            username.value = value;
        } else if (name === 'password') {
            password.value = value;
        }
        setAuthInfo({ username: { ...username }, password: { ...password } });
    };

    const onLoginHandler = (event) => {
        event.preventDefault();
        dispatch({ type: actionTypes.SET_LOADER, payload: true });
        dispatch(login(authInfo.username.value, authInfo.password.value, (data) => {
            dispatch({ type: actionTypes.SET_LOADER, payload: false });
            // callback function after login
            if (data) {
                history.push('/danh-muc');
            }
            else {
                alert('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
        }));
    }

    return (
        <div className="wrap-login-page">
            <span className="bg-image"></span>
            <div className="login-box">
                <div className="container">
                    <div className="user signinBx">
                        <div className="imgBx">
                            <img src={bg} alt="bg.img" />
                        </div>
                        <div className="formBx">
                            <form onSubmit={onLoginHandler}>
                                <h2>Đăng Nhập dành cho ADMIN</h2>
                                {error ? <p className="error">Username hoặc mật khẩu không đúng</p> : null}
                                <input
                                    type="username"
                                    name="username"
                                    placeholder="Tên đăng nhập"
                                    value={authInfo.username.value}
                                    onChange={changeAuthInfoHandler}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={authInfo.password.value}
                                    onChange={changeAuthInfoHandler}
                                />
                                <button type="submit" name="">Đăng nhập</button>
                                {/* <p className="signup">
                                <a href="#0">Quên mật khẩu?</a>
                            </p> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
