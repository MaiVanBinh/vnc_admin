import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Table, Form, Modal, FormControl } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../../store/actions/actionTypes";
import { IconPlus, IconRefresh, IconSearch } from "./../../../../store/utilities/SVG";
import {
  validateLength,
  getIndexListPage,
} from "../../../../store/utilities/common";
import Pagination from "./../../../../components/Panigation/Pagination";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    groups: state.creaturesCategories ? state.creaturesCategories.groups : null,
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setListOrders: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_ORDERS,
        payload,
      }),
  };
};

const Orders = (props) => {
  const { auth, groups, orders, setListOrders, setLoader } = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [formInput, setFormInput] = useState({
    name_vn: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    name_latin: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    group: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
  });

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  });

  const resetFormInput = () => {
    setFormInput({
      name_vn: {
        value: null,
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      name_latin: {
        value: null,
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      group: {
        value: parseInt(groups[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
    });
  };

  const getOrdersList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "orders",
      params: filterList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setListOrders(res.data.data);
      setLoader(false);
    });
  }, [setLoader, setListOrders, filterList]);

  useEffect(() => {
    getOrdersList();
  }, [filterList, getOrdersList]);

 

  

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  const onChangeInput = (v) => {
    let isValid = false;
    const name = v.target.name;
    const value = v.target.value;
    
    if (validateLength(value, 1, 100) !== "incorrect") {
      isValid = true;
    }
    const formInputUpdate = { ...formInput };
    formInputUpdate[name] = {
      value: value,
      isValid: isValid,
      validMessage: "Don't allow empty string",
    };
    setFormInput({ ...formInputUpdate });
  };

  const preprocessInput = () => {
    let inputValue = {};
    for (const key in formInput) {
      if (formInput[key].isValid === false || formInput[key].value === null) {
        return false;
      } else {
        inputValue[key] = formInput[key].value;
      }
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
      url: baseUrl + "auth/orders",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowCreate(false);
        getOrdersList();
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const editHandler = () => {
    const data = preprocessInput();
    if (!data) {
      return;
    }
    setLoader(true);
    axios({
      method: "put",
      url: baseUrl + "auth/orders/" + currentOrder,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowEdit(false);
        getOrdersList();
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const onShowEditFormHandler = (item) => {
    setCurrentOrder(item.id);
    setFormInput({
      name_vn: {
        value: item.name_vn,
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      name_latin: {
        value: item.name_latin,
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      group: {
        value: parseInt(item.group),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
    });
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/orders/" + currentOrder.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setShowDelete(false);
        getOrdersList();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert("Xóa không thành công.");
      });
  };

  const openDelete = (e) => {
    setCurrentOrder(e);
    setShowDelete(true);
  };

  return (
    <div className="container-fluid pt-3 pb-5 ">
      <div className="wrap-action mb-3 d-flex justify-content-between">
        <div>
          <Button
            className="btn-primary mr-2"
            onClick={() => {
              setShowCreate(true);
              resetFormInput();
            }}
          >
            <IconPlus width={15} height={15} color={"#fff"} />
          </Button>
          <Button onClick={() => {
                setFilterList({
                  page: 1,
                  limit: 10,
                });
                setSearchKeyword("");
                getOrdersList();
              }}>
            <IconRefresh width={15} height={15} color={"#fff"} />
          </Button>
        </div>
        <div>
            <Form inline className="searchCp">
              <Form.Control
                className="mr-sm-2"
                value={filterList.group}
                as="select"
                onChange={(e) =>
                  setFilterList({ ...filterList, group: e.target.value , page: 1})
                }
              >
                <option value={null}>Lớp</option>
                {groups ? groups.map(item => <option key={item.id} value={item.id}>{item.name_vn}</option>) : null}
              </Form.Control>
              <FormControl
                type="text"
                placeholder=""
                className="mr-sm-2"
                onChange={(e) => setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
              <Button
                onClick={() =>
                  setFilterList({ ...filterList, name: searchKeyword , page: 1})
                }
              >
                <IconSearch width={15} height={15} color={"#fff"} />
              </Button>
            </Form>
          </div>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên tiếng việt</th>
              <th>Tên Latin</th>
              <th>Lớp</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="list-images">
            {orders && orders.orders.length > 0 ? (
              orders.orders.map((e, i) => {
                let beginIndex = 1;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td>{e.name_vn}</td>
                    <td>{e.name_latin}</td>
                    <td>{e.groupVn}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <Button
                        onClick={() => {
                          onShowEditFormHandler(e);
                          setShowEdit(true);
                        }}
                        className="mr-2"
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => openDelete(e)}
                        className="btn-danger"
                      >
                        Xóa
                      </Button>
                    </td>
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
          {orders ? (
            <Pagination pagination={orders.pages} callFetchList={changePage} />
          ) : null}
        </div>
      </div>

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Bộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Bộ Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên bộ tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Bộ Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên bộ latin"
                value={formInput.name_latin.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formSpecies">
              <Form.Label>Lớp</Form.Label>
              {groups && groups.length > 0 ? (
                <Form.Control
                  name="group"
                  as="select"
                  onChange={onChangeInput}
                  defaultValue={parseInt(groups[0].id)}
                >
                  {groups.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
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

      {/* edit */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa Bộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Bộ Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên bộ tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Bộ Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên bộ latin"
                value={formInput.name_latin.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formSpecies">
              <Form.Label>Lớp</Form.Label>
              {groups && groups.length > 0 ? (
                <Form.Control
                  name="group"
                  as="select"
                  onChange={onChangeInput}
                  value={
                    formInput ? formInput.group.value : parseInt(groups[0].id)
                  }
                  defaultValue={parseInt(groups[0].id)}
                >
                  {groups.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={editHandler}>
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
          <Modal.Title>Xóa Bộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa "' +
            (currentOrder ? currentOrder.name_vn : "") +
            '" ?'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
