import React from "react";
import "./Footer.css";
import PhoneIcon from "../../assets/icons/phone.png";
import GmailIcon from "../../assets/icons/gmail.png";
import FooterSlider from "./FooterSlider/FooterSlider";
import { Link } from 'react-router-dom';
const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-intro">
          <h6>Giới thiệu</h6>
          <p>
            Website Sinh vật rừng Việt Nam là một nỗ lực của những con người
            đang mong muốn góp một phần nhỏ bé của mình vào việc bảo tồn thiên
            nhiên và nhằm đáp ứng yêu cầu khoa học phục vụ cho việc quản lý nhà
            nước về công tác nghiên cứu, bảo tồn thiên nhiên Việt Nam và công
            tác tra cứu, tìm hiểu các loài động, thực vật, côn trùng, các văn
            bản pháp quy liên quan đến việc quản lý, xây dựng và bảo vệ, phát
            triển rừng. Rất mong được sự đồng cảm của mọi người.
          </p>
        </div>
        <div className="footer__cl">
          <div className="footer-contact">
            <h6>Liên hệ</h6>
            <ul>
              <li>
                <img src={PhoneIcon} alt=""/>
                <p>0967607690</p>
              </li>
              <li>
                <img src={GmailIcon} alt="" />{" "}
                <a href="mailto:maivanbinh1321999@gmail.com">
                  maivanbinh1321999@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link">
            <ul>
              <li>
                <Link to="/trang-chu">Trang chủ</Link>
              </li>
              <li>
                <Link to="/sinh-vat">Sinh vật</Link>
              </li>
              <li>
                <Link to="/bai-viet">Bài viết</Link>
              </li>
              <li>
                <Link to="/vuon-quoc-gia">Vườn quốc gia</Link>
              </li>
              <li>
                <Link to='/lien-he'>Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <p>
            &copy;Ghi rõ nguồn <a href="/">Sinh vật rừng Việt Nam</a> khi bạn
            phát hành lại thông tin từ Website này
          </p>
        {/* <div className="cr_text">
          <p>
            &copy;Ghi rõ nguồn <a href="/">Sinh vật rừng Việt Nam</a> khi bạn
            phát hành lại thông tin từ Website này
          </p>
        </div> */}
        {/* <div className="image-slide">
          <FooterSlider />
        </div> */}
      </div>
    </footer>
  );
};

export default footer;
