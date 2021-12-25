import React, { useCallback, useEffect, useState } from "react";
import "./Dashboard.css"
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    events: state.events,
    groups: state.groups,
    families: state.families,
    orders: state.orders,
    creatures: state.creatures,
    footprints: state.footprints,
    timberSample: state.timberSample,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setPosts: (payload) =>
      dispatch({
        type: actionTypes.SET_POSTS_LIST,
        payload,
      }),
    setEvents: (payload) =>
      dispatch({
        type: actionTypes.SET_EVENTS_LIST,
        payload,
      }),
    setListGroups: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_GROUPS,
        payload,
      }),
    setListFamilies: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_FAMILIES,
        payload,
      }),
    setListOrders: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_ORDERS,
        payload,
      }),
    setCreatures: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_CREATURES,
        payload,
      }),
    setFootprints: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_FOOTPRINTS,
        payload,
      }),
    setTimberSample: (payload) =>
      dispatch({
        type: actionTypes.SET_TIMBER_SAMPLE,
        payload,
      }),
  };
};

const Dashboard = (props) => {
  const {
    auth,
    setLoader,
    posts,
    setPosts,
    events,
    setEvents,
    groups,
    setListGroups,
    families,
    setListFamilies,
    orders,
    setListOrders,
    creatures,
    setCreatures,
    footprints,
    setFootprints,
    timberSample,
    setTimberSample
  } = props;

  const [questions, setQuestions] = useState(null)

  const [filterList, setFilterList] = useState({
    // posts
    page: 1,
    limit: 10,
    is_publish: "all",
  });

  const getPostList = useCallback(
    (page) => {
      if (filterList.is_publish === "Tất cả") filterList.is_publish = "all";
      setLoader(true);
      axios({
        method: "get",
        url: baseUrl + "auth/posts",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        params: filterList,
      }).then((res) => {
        setLoader(false);
        setPosts(res.data.data);
      });
    },
    [auth.token, filterList, setLoader, setPosts]
  );

  const getQuestionList = async () => {
    const res = await axios({
      method: "get",
      url: baseUrl + "question",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterList,
    })

    setQuestions(res.data.data);
  }

  const getEventList = useCallback(
    (page) => {
      if (filterList.is_publish === "Tất cả") filterList.is_publish = "all";
      console.log(filterList);
      setLoader(true);
      axios({
        method: "get",
        url: baseUrl + "campaign-event",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        params: filterList,
      }).then((res) => {
        setEvents(res.data.data);
      });
    },
    [auth.token, filterList, setLoader, setEvents]
  );

  const getGroupsList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "groups",
      params: filterList,
    }).then((res) => {
      setListGroups(res.data.data);
    });
  }, [filterList, setListGroups, setLoader] );

  const getFamiliesList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "families",
      params: filterList,
    }).then((res) => {
      setListFamilies(res.data.data);
    });
  }, [filterList, setListFamilies, setLoader]);

  const getOrdersList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "orders",
      params: filterList,
    }).then((res) => {
      setListOrders(res.data.data);
    });
  }, [setLoader, setListOrders, filterList]);

  const getCreaturesList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "creatures",
      params: filterList,
    }).then((res) => {
      setCreatures(res.data.data);
    });
  }, [setCreatures, setLoader, filterList]);

  const getFootprint = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "footprint",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterList,
    }).then((res) => {
      setFootprints(res.data.data);
    });
  }, [auth.token, filterList, setFootprints, setLoader]);

  const getTimberSample = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "woods",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterList,
    }).then((res) => {
      setTimberSample(res.data.data);
    });
  }, [auth.token, filterList, setLoader, setTimberSample]);
  
  useEffect(() => {
    getPostList();
    getQuestionList();
    getEventList();
    getGroupsList();
    getFamiliesList();
    getOrdersList();
    getCreaturesList();
    getFootprint();
    getTimberSample();
  }, [getPostList, setQuestions, getEventList, getGroupsList, getFamiliesList, getOrdersList, getCreaturesList, getFootprint, getTimberSample]);

  const test = () => {
    console.dir(events)
  }
  return (
    <Container className="dashboard container-fluid pt-3 pb-5">
      <Row className="justify-content-md-center">
        <Col xs lg="3" className="col-content">
          { posts ?
            <div className="info-center">
              <div className="content">
                <span className="total">{posts.total}</span>
              </div>
              <div className="title">
                <span>Bài viết</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { questions ?
            <div className="info-center">
              <div className="content">
                <span className="total">{questions.total}</span>
              </div>
              <div className="title">
                <span>Câu hỏi</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { events ?
            <div className="info-center">
              <div className="content">
                <span className="total">{events.total}</span>
              </div>
              <div className="title">
                <span>Sự kiện</span>
              </div>
            </div>
            : null
          }
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="3" className="col-content">
          { groups ?
            <div className="info-center">
              <div className="content">
                <span className="total">{groups.total}</span>
              </div>
              <div className="title">
                <span>Lớp</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { families ?
            <div className="info-center">
              <div className="content">
                <span className="total">{families.total}</span>
              </div>
              <div className="title">
                <span>Họ</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { orders ?
            <div className="info-center">
              <div className="content">
                <span className="total">{orders.total}</span>
              </div>
              <div className="title">
                <span>Bộ</span>
              </div>
            </div>
            : null
          }
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="3" className="col-content">
          { creatures ?
            <div className="info-center">
              <div className="content">
                <span className="total">{creatures.total}</span>
              </div>
              <div className="title">
                <span>Sinh vật</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { footprints ?
            <div className="info-center">
              <div className="content">
                <span className="total">{footprints.total}</span>
              </div>
              <div className="title">
                <span>Dấu chân</span>
              </div>
            </div>
            : null
          }
        </Col>
        <Col xs lg="3" className="col-content">
          { timberSample ?
            <div className="info-center">
              <div className="content">
                <span className="total">{timberSample.total}</span>
              </div>
              <div className="title">
                <span>Mẫu gỗ</span>
              </div>
            </div>
            : null
          }
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
