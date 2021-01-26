import React, { useState } from 'react';
import './SignIn.css';
import { login } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import bg from "./../../assets/bg.jpg";
import { useHistory } from 'react-router';

const SignIn = (props) => {
    const [authInfo, setAuthInfo] = useState({
        email: {
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
        const email = { ...authInfo.email };
        const password = { ...authInfo.password };
        if (name === 'email') {
            email.value = value;
        } else if (name === 'password') {
            password.value = value;
        }
        setAuthInfo({ email: { ...email }, password: { ...password } });
    };

    const onLoginHandler = (event) => {
        event.preventDefault();
        console.log(authInfo);
        dispatch(login(authInfo.email.value, authInfo.password.value, (data) => {
            // callback function after login
            if(data) {
                history.push('/danh-muc');
            }
        }));
    }
    return (
        <div className="login-box">
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx">
                        <img src={bg} alt="bg.img" />
                    </div>
                    <div className="formBx">
                        <form onSubmit={onLoginHandler}>
                            <h2>Đăng Nhập dành cho ADMIN</h2>
                            {error ? <p className="error">Email hoặc mật khẩu không đúng</p> : null}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={authInfo.email.value}
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
                            <p className="signup">
                                <a href="#0">Quên mật khẩu?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
