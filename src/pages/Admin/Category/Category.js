import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import { validateLength, getIndexListPage } from "../../../store/utilities/common";
import Pagination from './../../../components/Panigation/Pagination';
import { 
  IconPlus,
  IconRefresh
} from './../../../store/utilities/SVG';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    category: state.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (payload) =>
      dispatch({
        type: actionTypes.SET_CATEGORY_LIST,
        payload,
      }),
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
  };
};

const Category = (props) => {
  const { auth, category, setCategory, setLoader } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [valid, setValid] = useState({
    message: "Tên danh mục không được để rỗng",
    valid: true,
  });

  const [infoCategory, setInfoCategory] = useState({
    id: null,
    title: "",
    created_at: "",
  });

  const [titleCreate, setTitleCreate] = useState("");

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    getCategoryList();
  }, [filterList]);

  const getCategoryList = () => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "categories",
      params: filterList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(filterList.page, filterList.limit, res.data.data.total);
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setCategory(res.data.data);
      setLoader(false);
    });
  };

  const openEdit = (item) => {
    setInfoCategory({
      id: item.id,
      title: item.title,
      created_at: item.created_at,
    });
    setShowEdit(true);
  };

  const openDelete = (item) => {
    setInfoCategory({
      id: item.id,
      title: item.title,
      created_at: item.created_at,
    });
    setShowDelete(true);
  };

  const editHandle = () => {
    if(validateLength(infoCategory.title, 1, 100) === 'incorrect'){
      return;
    }
    setLoader(true);
    axios({
      method: "put",
      url: baseUrl + "auth/categories/" + infoCategory.id,
      data: {
        title: infoCategory.title,
      },
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    }).then(() => {
      setShowEdit(false);
      getCategoryList();
    });
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/categories/" + infoCategory.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    }).then((res) => {
      // console.log("delete handle result:", res);
      setShowDelete(false);
      getCategoryList();
    })
    .catch(err => {
      setLoader(false);
      setShowDelete(false);
      alert("Xóa không thành công. Xóa những bài viết thuộc danh mục này trước.");
    });
  };

  const saveHandle = () => {
    if(validateLength(titleCreate, 1, 100) === 'incorrect'){
      return;
    }
    setLoader(true);
    axios({
      method: "post",
      url: baseUrl + "auth/categories",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: {
        title: titleCreate,
      },
    })
      .then(() => {
        setShowCreate(false);
        getCategoryList();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoader(false);
      });
  };

  const onChangeTitle = (value) => {
    if (validateLength(value, 1, 100) === "incorrect") {
      setValid({
        message: "Tên danh mục không được để rỗng",
        valid: false,
      });
    } else {
      setValid({
        message: "Tên danh mục không được để rỗng",
        valid: true,
      });
    }
    setTitleCreate(value);
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList, page
    })
  }

  return (
    <div>
      <div className="container-fluid pt-3 pb-5">
        <div className="wrap-action mb-3">
          <Button
            className="mr-2"
            onClick={() => {
              setShowCreate(true);
              setTitleCreate("");
              setValid({
                message: "Tên danh mục không được để rỗng",
                valid: true,
              });
            }}
          >
            <IconPlus width={15} height={15} color={'#fff'} />
          </Button>
          <Button onClick={() => getCategoryList()}>
            <IconRefresh width={15} height={15} color={'#fff'} />
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category && category.category.length > 0 ? (
              category.category.map((e, i) => {
                let beginIndex = category.pages.begin;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td>{e.title}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <Button
                        onClick={() => {
                          openEdit(e);
                          setValid({
                            message: "Tên danh mục không được để rỗng",
                            valid: true,
                          });
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
          {
            category ? <Pagination pagination={category.pages} callFetchList={changePage} /> : null
          }
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
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                className={valid.valid ? null : "form-control is-invalid"}
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoCategory.title}
                onChange={(v) => {
                  setInfoCategory({ ...infoCategory, title: v.target.value });
                  onChangeTitle(v.target.value);
                }}
              />
              {!valid.valid ? (
                <Form.Control.Feedback type="invalid">
                  {valid.message}
                </Form.Control.Feedback>
              ) : null}
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
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                className={valid.valid ? null : "form-control is-invalid"}
                type="title"
                placeholder="Nhập tên danh mục"
                value={titleCreate}
                onChange={(v) => onChangeTitle(v.target.value)}
              />
              {!valid.valid ? (
                <Form.Control.Feedback type="invalid">
                  {valid.message}
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
          {'Bạn có chắc muốn xóa "' + infoCategory.title + '" ?'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
