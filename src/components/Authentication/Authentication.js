import React from "react";
import './Authentication.css';
import bg from './bg.jpg';

const Authentication = (props) => {
  return (
    <div className='login-box' >
      <div className="container">
        <div className="user signinBx">
          <div className="imgBx">
            <img src={bg} alt="bg.img" />
          </div>
          <div className="formBx">
            <form>
              <h2>Đăng Nhập dành cho ADMIN</h2>
              <input type="email" name="" placeholder="Email" />
              <input type="password" name="" placeholder="Mật khẩu" />
              <button type="submit" name="">
                Đăng nhập
              </button>
              <p className="signup">
                <a href="#0">Quên mật khẩu?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
