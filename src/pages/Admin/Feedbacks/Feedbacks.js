import React, { useState, useEffect } from "react";
// import "./Feedbacks.css";
import { connect } from "react-redux";
import { Modal, Button, Table, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import {
  validateLength,
  getIndexListPage,
} from "../../../store/utilities/common";
import Pagination from "./../../../components/Panigation/Pagination";
import {
  IconPlus,
  IconRefresh,
  IconSearch,
} from "./../../../store/utilities/SVG";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    feedbacks: state.feedbacks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFeedbacks: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_FEEDBACK,
        payload,
      }),
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
  };
};

const Feedbacks = (props) => {
  const { auth, feedbacks, setFeedbacks, setLoader } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [infoFeedbacks, setInfoFeedbacks] = useState({
    id: null,
    title: "",
    created_at: "",
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [formInput, setFormInput] = useState({
    name_vn: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    name_en: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    list: {
      value: "1",
      isValid: true,
    },
  });

  const resetFormInput = () => {
    setFormInput({
      name_vn: {
        value: null,
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
      name_en: {
        value: null,
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },

      list: {
        value: "1",
        isValid: true,
      },
    });
  };

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
    title: "",
  });

  useEffect(() => {
    getFeedbacksList();
  }, [filterList]);

  const getFeedbacksList = () => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "feedbacks",
      params: filterList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setFeedbacks(res.data.data);
      setLoader(false);
    });
  };

  const openEdit = (item) => {
    const updateFormInput = { ...formInput };
    for (let key in updateFormInput) {
      if (key !== "id") {
        updateFormInput[key].value = item[key];
      }
    }
    setInfoFeedbacks({
      id: item.id,
      title: item.name_vn,
      created_at: item.created_at,
    });

    setShowEdit(true);
  };

  const openDelete = (item) => {
    setInfoFeedbacks({
      id: item.id,
      title: item.name_vn,
      created_at: item.created_at,
    });
    setShowDelete(true);
  };

  const editHandle = () => {
    const data = preprocessInput();
    if (!data) {
      return;
    }
    console.log(data);
    // setLoader(true);
    // axios({
    //   method: "put",
    //   url: baseUrl + "auth/Feedbacks/" + infoFeedbacks.id,
    //   data,
    //   headers: {
    //     Authorization: "Bearer " + auth.token,
    //   },
    // }).then(() => {
    //   setShowEdit(false);
    //   getFeedbacksList();
    // });
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/Feedbacks/" + infoFeedbacks.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        // console.log("delete handle result:", res);
        setShowDelete(false);
        getFeedbacksList();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert(
          "Xóa không thành công. Xóa những bài viết thuộc danh mục này trước."
        );
      });
  };

  const preprocessInput = () => {
    let inputValue = {};
    let isValid = true;
    const formInputUpdate = { ...formInput };
    console.log(formInput)
    for (const key in formInput) {
      if (formInput[key].minLength) {
        if (
          validateLength(
            formInput[key].value,
            formInput[key].minLength,
            100
          ) === "incorrect"
        ) {
          isValid = false;
          formInputUpdate[key].isValid = false;
        }
      }
      inputValue[key] = formInput[key].value;
    }

    if (!isValid) {
      setFormInput(formInputUpdate);
      return false;
    }
    return inputValue;
  };

  const saveHandle = () => {
    const data = preprocessInput();
    if (!data) {
      return;
    }
    setLoader(true);
    axios({
      method: "post",
      url: baseUrl + "auth/Feedbacks",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then(() => {
        setShowCreate(false);
        getFeedbacksList();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoader(false);
      });
  };

  const onChangeInput = (v) => {
    const name = v.target.name;
    const value = v.target.value;
    const formInputUpdate = { ...formInput };
    formInputUpdate[name].value = value;
    formInputUpdate[name].isValid = true;
    setFormInput(formInputUpdate);
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  return (
    <div>
      <div className="container-fluid pt-3 pb-5">
        <div className="wrap-action mb-3 d-flex justify-content-between">
          <div>
            <Button
              className="mr-2"
              onClick={() => {
                setShowCreate(true);
                resetFormInput();
              }}
            >
              <IconPlus width={15} height={15} color={"#fff"} />
            </Button>
            <Button
              onClick={() => {
                setFilterList({
                  page: 1,
                  limit: 10,
                  title: "",
                });
                getFeedbacksList();
              }}
            >
              <IconRefresh width={15} height={15} color={"#fff"} />
            </Button>
          </div>

          <Form inline className="searchCp">
            <FormControl
              type="text"
              placeholder=""
              className="mr-sm-2"
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
            />
            <Button
              onClick={() =>
                setFilterList({ ...filterList, title: searchKeyword })
              }
            >
              <IconSearch width={15} height={15} color={"#fff"} />
            </Button>
          </Form>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>email</th>
              <th>Star</th>
              <th>Message</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks && feedbacks.feedbacks.length > 0 ? (
              feedbacks.feedbacks.map((e, i) => {
                let beginIndex = feedbacks.pages.begin;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td>{e.email}</td>
                    <td>{e.star}</td>
                    <th>{e.message}</th>
                    <td>{e.created_at}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center mb-0">
                    Không có kết quả nào được tìm thấy
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="pagination mt-4 d-flex justify-content-center">
          {feedbacks ? (
            <Pagination
              pagination={feedbacks.pages}
              callFetchList={changePage}
            />
          ) : null}
        </div>
      </div>

      {/* edit */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên danh mục tiếng việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                name="name_vn"
                placeholder="Nhập tên danh mục tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.valid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên danh mục tiểng anh</Form.Label>
              <Form.Control
                className={
                  formInput.name_en.isValid ? null : "form-control is-invalid"
                }
                name="name_en"
                placeholder="Nhập tên danh mục tiếng anh"
                value={formInput.name_en.value}
                onChange={onChangeInput}
              />
              {!formInput.name_en.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_en.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Danh sách</Form.Label>
              <Form.Control
                name="list"
                as="select"
                onChange={onChangeInput}
                value={formInput.list.value}
                defaultValue={formInput.list.value}
              >
                <option value="0">0</option>
                <option value="1">1</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={editHandle}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên danh mục tiếng việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                name="name_vn"
                placeholder="Nhập tên danh mục tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.valid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên danh mục tiểng anh</Form.Label>
              <Form.Control
                className={
                  formInput.name_en.isValid ? null : "form-control is-invalid"
                }
                name="name_en"
                placeholder="Nhập tên danh mục tiếng anh"
                value={formInput.name_en.value}
                onChange={onChangeInput}
              />
              {!formInput.name_en.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_en.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={saveHandle}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete */}
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa "' + infoFeedbacks.title + '" ?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={deleteHandle}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks);
