import React from "react";
import "./Contact.css";

import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import SideBar from "../../components/SideBar/SideBar";
import TeamMembers from "./TeamMembers/TeamMembers";
import Heading from "../../components/UI/HeadingTitle/HeadingTitle";

const Contact = () => {
  return (
    <LayoutContainer>
      <Left>
          <div style={{textAlign: 'center'}}>
            <Heading
                styleHeading="heading"
                title="MỌI THẮC MẮC XIN VUI LÒNG LIÊN HỆ VỚI CÁC THÀNH VIÊN WEBSITE SINH VẬT RỪNG VIỆT NAM"
                />
          </div>
        <TeamMembers />
      </Left>
      <Right>
        <SideBar mode="author" />
      </Right>
    </LayoutContainer>
  );
};

export default Contact;
