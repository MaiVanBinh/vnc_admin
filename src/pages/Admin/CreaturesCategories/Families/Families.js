import React, { useEffect, useState, useCallback } from "react";
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
    orders: state.creaturesCategories ? state.creaturesCategories.orders : null,
    families: state.families,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setListFamilies: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_FAMILIES,
        payload,
      }),
  };
};

const Orders = (props) => {
  const { auth, orders, families, setListFamilies, setLoader, resetFilterData} = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentFamily, setCurrentFamily] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  });
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
    order: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
  });
  const getFamiliesList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "families",
      params: filterList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setListFamilies(res.data.data);
      setLoader(false);
    });
  }, [filterList, setListFamilies, setLoader]);

  

  useEffect(() => {
    getFamiliesList();
  }, [filterList, getFamiliesList]);

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
      order: {
        value: parseInt(orders[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
    });
  };

  

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
      url: baseUrl + "auth/families",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowCreate(false);
        getFamiliesList();
        resetFilterData();
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
      url: baseUrl + "auth/families/" + currentFamily,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowEdit(false);
        getFamiliesList();
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const onShowEditFormHandler = (item) => {
    setCurrentFamily(item.id);
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
      order: {
        value: parseInt(item.order),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
    });
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/families/" + currentFamily.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setShowDelete(false);
        getFamiliesList();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert("Xóa không thành công.");
      });
  };

  const openDelete = (e) => {
    setCurrentFamily(e);
    setShowDelete(true);
  };

  return (
    <div className="container-fluid pt-3 pb-5">
      <div className="wrap-action mb-3  d-flex justify-content-between">
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
                getFamiliesList();
              }}>
            <IconRefresh width={15} height={15} color={"#fff"} />
          </Button>
        </div>
        <Form inline className="searchCp">
          <Form.Control
            className="mr-sm-2"
            value={filterList.order}
            as="select"
            onChange={(e) =>
              setFilterList({ ...filterList, order: e.target.value, page: 1 })
            }
          >
            <option value={null}>Tất cả bộ</option>
            {orders
              ? orders.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_vn}
                  </option>
                ))
              : null}
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
              setFilterList({ ...filterList, name: searchKeyword, page: 1 })
            }
          >
            <IconSearch width={15} height={15} color={"#fff"} />
          </Button>
        </Form>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên tiếng việt</th>
              <th>Tên Latin</th>
              <th>họ</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="list-images">
            {families && families.families.length > 0 ? (
              families.families.map((e, i) => {
                let beginIndex = 1;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td>{e.name_vn}</td>
                    <td>{e.name_latin}</td>
                    <td>{e.order_vn}</td>
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
          {families ? (
            <Pagination
              pagination={families.pages}
              callFetchList={changePage}
            />
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
          <Modal.Title>Tạo Họ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Họ Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên họ tiếng việt"
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
              <Form.Label>Tên Họ Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên họ latin"
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
              <Form.Label>Bộ</Form.Label>
              {orders && orders.length > 0 ? (
                <Form.Control
                  name="order"
                  as="select"
                  onChange={onChangeInput}
                  defaultValue={parseInt(orders[0].id)}
                >
                  {orders.map((e, i) => (
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
          <Modal.Title>Tạo Họ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Họ Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên họ tiếng việt"
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
              <Form.Label>Tên Họ Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên họ latin"
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
              <Form.Label>Loài</Form.Label>
              {orders && orders.length > 0 ? (
                <Form.Control
                  name="order"
                  as="select"
                  onChange={onChangeInput}
                  value={
                    formInput ? formInput.order.value : parseInt(orders[0].id)
                  }
                  defaultValue={parseInt(orders[0].id)}
                >
                  {orders.map((e, i) => (
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
          <Modal.Title>Xóa Họ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa "' +
            (currentFamily ? currentFamily.name_vn : "") +
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
