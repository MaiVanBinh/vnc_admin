import React, { useState } from "react";
import "./AdminPage.css";
import Creatures from "./Creatures/Creatures";
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin";

const AdminPage = (props) => {
  const [marginLeft, setMarginLeft] = useState("300px");
  const sideBarHanlder = () => {
    if (marginLeft === "300px") {
      setMarginLeft("0px");
    } else {
      setMarginLeft("300px");
    }
  };
  return (
    <div>
      <div className={marginLeft === '300px' ? "admin-side-bar active" : "admin-side-bar"}>
        <SideBarAdmin />
      </div>
      <div style={{ marginLeft: marginLeft, transition: "0.5s ease-in-out" }}>
        <Creatures sideBarClick={sideBarHanlder}/>
      </div>
    </div>
  );
};

export default AdminPage;
