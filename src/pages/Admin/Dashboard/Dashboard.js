import React, { useCallback, useEffect, useState } from "react";
import "./Dashboard.css"
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import { IconWood, IconFootPrint, IconQuestion, IconEvent } from "../../../store/utilities/SVG";

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
              <div>
                <span className="icon">
                  <svg
                    height="25px"
                    viewBox="-61 0 484 484.375"
                    width="25px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.383 484.375h349.61c3.312 0 6.195-2.313 6.195-5.625V66.555a6.327 6.327 0 00-6.196-6.18h-44.805V48.344c0-3.313-3.07-5.969-6.382-5.969h-30.618V6a6.001 6.001 0 00-12 0v36.375H232.41a6.168 6.168 0 00-6.222 5.969v12.031h-90V48.344a6.168 6.168 0 00-6.223-5.969h-29.778V6a6.001 6.001 0 00-12 0v36.375H57.57c-3.312 0-6.382 2.656-6.382 5.969v12.031H6.383a6.327 6.327 0 00-6.195 6.18V478.75c0 3.313 2.882 5.625 6.195 5.625zm231.804-430h61v22h-61zm-175 0h61v22h-61zm-51 18h39v10.117c0 3.313 3.07 5.883 6.383 5.883h72.395a6.1 6.1 0 006.222-5.883V72.375h90v10.117a6.1 6.1 0 006.223 5.883h72.395c3.312 0 6.382-2.57 6.382-5.883V72.375h39v400h-338zm0 0" />
                    <path d="M303.21 381.375H59.165c-3.312 0-6 2.688-6 6s2.688 6 6 6h244.047c3.312 0 6-2.688 6-6s-2.688-6-6-6zm0 0M303.21 425.375H59.165c-3.312 0-6 2.688-6 6s2.688 6 6 6h244.047c3.312 0 6-2.688 6-6s-2.688-6-6-6zm0 0M308.188 134.375c0-3.313-2.688-6-6-6h-242c-3.313 0-6 2.688-6 6v205c0 3.313 2.687 6 6 6h242c3.312 0 6-2.688 6-6zm-242 6h230v193h-230zm0 0" />
                    <path d="M213.625 205.828l-10.438-1.11v-21.573a5.843 5.843 0 00-2.351-4.903 5.777 5.777 0 00-5.367-.547l-66.781 23.68h-33.93c-6.38 0-11.57 4.75-11.57 11.129v33.766c0 4.5 3 8.406 6 10.316v33.02c0 3.316 3.046 5.769 6.359 5.769h19.351a5.898 5.898 0 005.754-4.188l9.7-32.82 65.203 22.899c.636.23 1.308.347 1.984.351a5.446 5.446 0 003.293-1.097 5.836 5.836 0 002.356-4.891V252.57l10.437-1.113c8.754-.918 15.441-8.238 15.563-17.043v-11.539c-.118-8.805-6.805-16.129-15.563-17.047zm-118.438 7.547h29v32h-29zm15.227 70h-9.226v-26h16.828zm80.773-16.207l-55-19.582v-36.402l55-19.582zm26-32.754a5.396 5.396 0 01-4.87 5.113l-9.13.97v-23.708l9.13.969a5.403 5.403 0 014.87 5.117zm0 0M274.188 223.375h-33c-3.313 0-6 2.688-6 6s2.687 6 6 6h33c3.312 0 6-2.688 6-6s-2.688-6-6-6zm0 0M238.688 215.422c.503 0 1.007-.063 1.492-.192l23.363-5.988a5.998 5.998 0 004.32-7.3 6.003 6.003 0 00-7.3-4.325l-23.36 5.992a5.999 5.999 0 001.484 11.813zm0 0M263.54 250.328l-23.36-5.988a6.002 6.002 0 00-2.98 11.625l23.359 5.988a5.994 5.994 0 007.3-4.32 6 6 0 00-4.32-7.305zm0 0" />
                  </svg>
                </span>
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
              <div className="icon">
                <span className="icon">
                  <IconQuestion/>
                </span>
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
              <div className="icon">
                <span className="icon">
                  <IconEvent width="30px" height="30px" />
                </span>
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
              <div className="icon">
                <span className="icon">
                  <IconFootPrint width="30px" height="30px" />
                </span>
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
              <div className="icon">
                <span className="icon">
                  <IconWood width="30px" height="30px" />
                </span>
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
