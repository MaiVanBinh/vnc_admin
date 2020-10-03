import React from "react";
import './Member.css';
import facebookIcon from '../../../../assets/icons/facebook.png';
import gmailIcon from '../../../../assets/icons/gmail.png';
import avatar from './avatar.jpg';

const member = (props) => {
  return (
    <div className="member-card">
      <div className="member-card__img">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="member-card__info">
        <div>
          <h1 className="member-card__title">Mai Văn Bình</h1>
          <p className="member-card__job">GIẢNG VIÊN ĐẠI HỌC HUẾ</p>
          <p className="member-card__text">
            Viện sinh thái Tài nguyên Sinh Vật. Số 18 Hoàng Quốc Việt - Hà Nội
          </p>
          <div className="member-card__cta">
            <a href="mailto: someone@example.com"  >
              <img src={gmailIcon} alt="gmailIcon" />
            </a>
            <a href="http://www.facebook.com/YOURUSERNAMEHERE"  >
              <img src={facebookIcon} alt="facebookIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default member;