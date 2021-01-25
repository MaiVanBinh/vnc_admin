import React, { useState } from "react";
import "./AdminPage.css";
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin";
import Posts from './Post/Post';
import Assets from './Asset/Asset';
import Users from './Users/Users';

const AdminPage = (props) => {
  // type 1: show page creatures
  // type 2: show categories
  const [type, setType] = useState(3);
  const [marginLeft, setMarginLeft] = useState("300px");
  const sideBarHanlder = () => {
    if (marginLeft === "300px") {
      setMarginLeft("0px");
    } else {
      setMarginLeft("300px");
    }
  };

  const changeType = (typeUpdate) => {
    setType(typeUpdate);
  }

  let adminContent = null;
  switch(type) {
    case 3: {
      adminContent = <Posts sideBarHanlder={sideBarHanlder}/>
      break;
    }
    case 4: {
      adminContent = <Assets sideBarHanlder={sideBarHanlder}/>
      break;
    }
    case 5: {
      adminContent = <Users sideBarHanlder={sideBarHanlder}/>
      break;
    }
    default: break;
  }
  console.log(type);
  return (
    <div>
      <div className={marginLeft === '300px' ? "admin-side-bar active" : "admin-side-bar"}>
        <SideBarAdmin changeType={changeType} type={type}/>
      </div>
      <div style={{ marginLeft: marginLeft, transition: "0.5s ease-in-out" }}>
        {adminContent}
      </div>
    </div>
  );
};

export default AdminPage;
