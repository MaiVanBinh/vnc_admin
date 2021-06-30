import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Species from "./Species/Species";
import Groups from "./Groups/Groups";
import * as actionTypes from "./../../../store/actions/actionTypes";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import Orders from "./Orders/Orders";
import Families from "./Families/Families";

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setCreaturesCategories: (payload) =>
      dispatch({
        type: actionTypes.SET_CREATURES_CATEGORIES,
        payload,
      }),
  };
};

const CreaturesCategories = (props) => {
  const [key, setKey] = useState("species");
  const { setCreaturesCategories, setLoader } = props;
  useEffect(() => {
    axios({
      method: "get",
      url: baseUrl + "filterData",
    }).then((res) => {
      setCreaturesCategories(res.data.data);
      setLoader(false);
    });
  }, [setCreaturesCategories, setLoader]);

  return (
    <div>
      <Tabs
        defaultActiveKey={key}
        id="uncontrolled-tab-example"
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="species" title="Loài">
          <div>
            <Species />
          </div>
        </Tab>
        <Tab eventKey="classes" title="Lớp">
          <div>
            <Groups />
          </div>
        </Tab>
        <Tab eventKey="orders" title="Bộ">
          <div>
            <Orders />
          </div>
        </Tab>
        <Tab eventKey="families" title="Họ">
          <div>
            <Families />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(CreaturesCategories);
