import React, { useEffect, useState } from "react";
import "./Wood.css";
import HeadingTitle from "../../components/UI/HeadingTitle/HeadingTitle";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import PostSideBar from "../../components/SideBar/SideBar";
import WoodFormItem from "./WoodFormItem/WoodFormItem";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
// import ButtonCustom from "../../components/UI/ButtonCustom/ButtonCustom";
import Loader from '../../components/UI/Loader/Loader';

const Wood = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.onFetchWood(page);
  }, [page]);

  let mainContent = null;
  if (props.woods) {
    mainContent = props.woods.map((item) => (
      <WoodFormItem key={item.id} wood={item} />
    ));
  }
  return (
    <LayoutContainer>
      <Left>
        <HeadingTitle title="Mẫu Gỗ" />
        <div className="workBx">{props.loading ? <Loader /> : mainContent}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: '20px'
          }}
        >
          <button
            className={page === 1 ? "button-page active" : "button-page"}
            onClick={() => setPage(1)}
          >
            1
          </button>
          <button
            className={page === 2 ? "button-page active" : "button-page"}
            onClick={() => setPage(2)}
          >
            2
          </button>
          <button
            className={page === 3 ? "button-page active" : "button-page"}
            onClick={() => setPage(3)}
          >
            3
          </button>
        </div>
      </Left>
      <Right>
        <PostSideBar mode="creatures" image />
      </Right>
    </LayoutContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.woods.loading,
    woods: state.woods.woods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWood: (page) => dispatch(actions.fetchWood(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Wood);
