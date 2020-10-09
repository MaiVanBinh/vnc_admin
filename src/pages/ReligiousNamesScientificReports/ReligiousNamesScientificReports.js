import React, { useEffect, useState } from "react";
import "./ReligiousNamesScientificReports.css";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import CurrentPost from "../../components/CurrentPost/CurrentPost";
import PostSideBar from "../../components/SideBar/SideBar";

const ReligiousNamesScientificReports = (props) => {
  const [isReligiousNames, setIsReligiousNames] = useState(true);

  const location = useLocation();
  const { onFecthPostDetail, onFetchCategory } = props;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let id = null;
    for (let params of query.entries()) {
      if (params[0] === "id") {
        id = params[1];
      }
    }
    let mode = location.pathname === "/bai-viet/danh-phap" ? true : false;
    setIsReligiousNames(mode);
    id = !id ? (mode ? 284 : 297) : id;
    onFecthPostDetail(id);
  }, [location, onFecthPostDetail, onFetchCategory]);

  return (
    <LayoutContainer>
      <Right>
        <PostSideBar
          mode={isReligiousNames ? "ReligiousNames" : "ScientificReports"}
        />
      </Right>
      <Left>
        <CurrentPost />
      </Left>
    </LayoutContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFecthPostDetail: (id) => dispatch(actions.fetchPostDetail(id)),
    onFetchCategory: (id) => dispatch(actions.fetchCategory()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ReligiousNamesScientificReports);
