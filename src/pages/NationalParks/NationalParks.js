import React, { useEffect, useState } from "react";
import "./NationalParks.css";
import { useHistory, useLocation } from "react-router-dom";
import NationalParksMap from "./NationalParksMap/NationalParksMap";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import HeadingTitle from "../../components/UI/HeadingTitle/HeadingTitle";
import Loading from "../../components/UI/Loader/Loader";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PostSideBar from "../../components/SideBar/SideBar";

const NationalParks = (props) => {
  const [isDetail, setIsDetail] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const {
    onFetchNationalParkById,
    onFetchNationalParkCoords,
    nationalParks,
  } = props;
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let nationalParkName = "";
    for (let param of query.entries()) {
      if (param[0] === "vqg") {
        nationalParkName = param[1];
      }
    }
    if (nationalParkName && nationalParks) {
      let np = nationalParks.filter((np) => np.name === nationalParkName);
      onFetchNationalParkById(np[0].id);
      setIsDetail(true);
    } else {
      setIsDetail(false);
    }
  }, [history, location, onFetchNationalParkById, nationalParks]);

  useEffect(() => {
    onFetchNationalParkCoords();
  }, [onFetchNationalParkCoords]);

  const fetchNationalParkDetail = (id, name) => {
    history.push({
      search: "vqg=" + name,
    });
  };

  let content = <Loading />;
  if (!isDetail && props.nationalParks) {
    content = (
      <NationalParksMap
        onClickNationParkHanlder={fetchNationalParkDetail}
        nationalParks={props.nationalParks}
      />
    );
  }
  if (isDetail && props.nationalPark) {
    content = (
      <div
        dangerouslySetInnerHTML={{ __html: props.nationalPark.content }}
      ></div>
    );
  }

  return (
    <LayoutContainer>
      <Right>
        <PostSideBar mode="nationalParks" mapImage={isDetail} />
      </Right>
      <Left>
        <div>
          <HeadingTitle
            styleHeading="heading"
            title="CÁC VƯỜN QUỐC GIA & KHU BẢO TỒN THIÊN NHIÊN VIỆT NAM"
          />
          <div className="np-center">{content}</div>
        </div>
      </Left>
      
    </LayoutContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    nationalPark: state.nationalPark.nationalPark,
    nationalParks: state.nationalPark.nationalParks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNationalParkById: (id) => dispatch(actions.fetchNationParkById(id)),
    onFetchNationalParkCoords: () =>
      dispatch(actions.fetchNationalParkCoords()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NationalParks);
