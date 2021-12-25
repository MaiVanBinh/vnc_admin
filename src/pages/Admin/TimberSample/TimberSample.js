import React, { useState, useEffect, useCallback } from "react";
import "./TimberSample.css";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Table,
  Form,
  Col,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../../../store/utilities/apiConfig";
import * as actionTypes from "../../../store/actions/actionTypes";
import Pagination from "../../../components/Panigation/Pagination";
import {
  getIndexListPage,
  validateLength,
} from "../../../store/utilities/common";
import {
  IconPlus,
  IconRefresh,
  // IconView,
  IconEdit,
  IconGarbage2,
  IconSearch,
} from "../../../store/utilities/SVG";
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    timberSample: state.timberSample,
    listImages: state.listImages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setTimberSample: (payload) =>
      dispatch({
        type: actionTypes.SET_TIMBER_SAMPLE,
        payload,
      }),
    setListImages: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_IMAGES,
        payload,
      }),
  };
};

const TimberSample = (props) => {
  const {
    auth,
    setLoader,
    timberSample,
    setTimberSample,
    listImages,
    setListImages,
  } = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [currentTS, setCurrentTS] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const setCreatures = useState({
    id: 0,
  })[1];
  const [imageSearch, setImageSearch] = useState({
    name: "",
  });
  const [filterImageList, setFilterImageList] = useState({
    name: "",
    page: 1,
    limit: 10,
  });
  const [formInput, setFormInput] = useState({
    creature: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    name_en: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    name_latin: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    name_vn: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
    img: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
  });

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  });

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
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setTimberSample(res.data.data);
      setLoader(false);
    });
  }, [auth.token, filterList, setLoader, setTimberSample]);

  useEffect(() => {
    getTimberSample();
  }, [filterList, getTimberSample]);

  const resetFormInput = () => {
    setFormInput({
      creature: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
      name_en: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
      name_latin: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
      name_vn: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
      img: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
        minLength: 1,
      },
    });
  };
  const getListImages = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "auth/assets",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterImageList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(
        filterImageList.page,
        filterImageList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;

      setListImages(res.data.data);
      setLoader(false);
    });
  }, [auth.token, filterImageList, setListImages, setLoader]);

  useEffect(() => {
    getListImages();
  }, [filterImageList, getListImages]);

  const changePageImageList = (page) => {
    setFilterImageList({
      ...filterImageList,
      page,
    });
  };

  

  const openDeleteModal = (item) => {
    setShowDelete(true);
    setCurrentTS(item);
  };

  const openEditModal = (item) => {
    const formInputUpdate = { ...formInput };
    formInput.creature.value = item.creature;
    formInputUpdate.name_en.value = item.name_en;
    formInputUpdate.name_vn.value = item.name_vn;
    formInputUpdate.name_latin.value = item.name_latin;
    formInputUpdate.img.value = item.avatarId;
    formInputUpdate.img.url = item.avatar;
    setCreatures({
      id: item.creature,
      name_en: item.name_en,
      name_vn: item.name_vn,
      name_latin: item.name_latin,
    });
    setFormInput(formInputUpdate);
    setCurrentTS(item);
    setShowEdit(true);
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/woods/" + currentTS.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setShowDelete(false);
        getTimberSample();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert("Xóa không thành công");
      });
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  const searchFootprintById = () => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "creatures/" + formInput.creature.value,
    })
      .then((res) => {
        setFormInput({
          creature: {
            value: res.data.data.id,
            isValid: true,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
          name_en: {
            value: "",
            isValid: true,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
          name_latin: {
            value: res.data.data.name_latin,
            isValid: true,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
          name_vn: {
            value: res.data.data.name_vn,
            isValid: true,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
          img: {
            value: formInput.img.value,
            url: formInput.img.url,
            isValid: true,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
        });
        setCurrentTS(res.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setFormInput({
          ...formInput,
          id: {
            value: null,
            isValid: false,
            validMessage: "Don't allow empty string",
            minLength: 1,
          },
        });
        setLoader(false);
      });
  };

  const preprocessInput = () => {
    let inputValue = {};
    for (const key in formInput) {
      if (
        formInput[key].isValid === false ||
        formInput[key].value === null ||
        formInput[key].value === ""
      ) {
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
      url: baseUrl + "auth/woods",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowCreate(false);
        getTimberSample();
      })
      .catch((err) => {
        console.log(err.response);
        setLoader(false);
      });
  };

  const updateHandler = () => {
    const data = preprocessInput();
    if (!data) {
      return;
    }
    setLoader(true);
    axios({
      method: "put",
      url: baseUrl + "auth/woods/" + currentTS.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowEdit(false);
        getTimberSample();
      })
      .catch((err) => {
        console.log(err.response);
        setLoader(false);
      });
  };

  return (
    <div className="container-fluid pt-3 pb-5">
      <div className="wrap-action mb-3 d-flex justify-content-between">
        <div>
          <Button
            className="btn-primary mr-2"
            onClick={() => {
              resetFormInput();
              setShowCreate(true);
            }}
          >
            <IconPlus width={15} height={15} color={"#fff"} />
          </Button>
          <Button onClick={() => {
            getTimberSample();
            setFilterList({ ...filterList, name: null })
          }}>
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
              setFilterList({ ...filterList, name: searchKeyword })
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
            <th>Thumbnail</th>
            <th>Tên tiếng việt</th>
            <th>Tên latin</th>
            <th>Tên tiếng anh</th>
            <th>Sinh vật id</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="list-images">
          {timberSample && timberSample.woods.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có kết quả nào được tìm thấy
              </td>
            </tr>
          ) : null}
          {timberSample && timberSample.woods.length > 0
            ? timberSample.woods.map((e, i) => {
                let beginIndex = timberSample.pages.begin;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td className="thumbnail">
                      <img
                        src={e.img}
                        className="img-fluid"
                        alt="error"
                        style={{ width: "150px" }}
                      />
                    </td>
                    <td className="name">{e.name_vn}</td>
                    <td className="name">{e.name_latin}</td>
                    <td className="name">{e.name_en}</td>
                    <td className="name">{e.creature}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <div className="action-group d-flex justify-content-center">
                        <div
                          className="icon d-flex align-items-center"
                          onClick={() => openEditModal(e)}
                        >
                          <IconEdit color={"#333333"} width={15} height={15} />
                        </div>
                        <div
                          className="icon d-flex align-items-center"
                          onClick={() => openDeleteModal(e)}
                        >
                          <IconGarbage2
                            color={"#333333"}
                            width={15}
                            height={15}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>

      <div className="pagination mt-4 d-flex justify-content-center">
        {timberSample ? (
          <Pagination
            pagination={timberSample.pages}
            callFetchList={changePage}
          />
        ) : null}
      </div>

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mẫu gỗ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>
                Nhập id sinh vật:{" "}
                {!formInput.creature.isValid ? (
                  <span style={{ color: "lightcoral" }}>
                    Sinh vật không tồn tại
                  </span>
                ) : null}
              </Form.Label>
              <Row>
                <Col sm={7}>
                  <Form.Control
                    type="number"
                    placeholder="Nhập id"
                    value={formInput.creature.value}
                    onChange={(v) =>
                      setFormInput({
                        ...formInput,
                        creature: {
                          ...formInput["creature"],
                          value: v.target.value.replace(/^0+/, ""),
                        },
                      })
                    }
                  />
                </Col>
                <Col sm={5}>
                  <Button onClick={searchFootprintById}>
                    <IconSearch width={15} height={15} color={"#fff"} />
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicNameVn">
              <Form.Label>Tên tiếng việt:</Form.Label>
              <Form.Control
                // className={valid.valid ? null : "form-control is-invalid"}
                type="text"
                value={formInput.name_vn.value}
                readOnly
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicNameLt">
              <Form.Label>Tên latin:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.name_latin.value}
                readOnly
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicNameEn">
              <Form.Label>Tên tiếng anh:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.name_en.value}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    name_en: {
                      isValid:
                        validateLength(e.target.value, 1, 100) !== "incorrect",
                      validMessage: "Don't allow empty string",
                      minLength: 1,
                      value: e.target.value,
                    },
                  })
                }
              />
              {!formInput.name_en.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_en.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicImage">
              <Form.Label className="mr-3">Chọn ảnh:</Form.Label>
              <Button
                onClick={() => {
                  getListImages();
                  setShowImage(true);
                }}
              >
                <IconPlus width={15} height={15} color={"#fff"} />
              </Button>
              {formInput.img && formInput.img.url ? (
                <div className="mt-3">
                  <img
                    src={formInput.img.url}
                    alt="Not Found"
                    style={{ width: "200px" }}
                  />
                </div>
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
          <Modal.Title>Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>
                Nhập id sinh vật:{" "}
                {!formInput.creature.isValid ? (
                  <span style={{ color: "lightcoral" }}>
                    Sinh vật không tồn tại
                  </span>
                ) : null}
              </Form.Label>
              <Row>
                <Col sm={7}>
                  <Form.Control
                    type="number"
                    placeholder="Nhập id dấu chân"
                    value={formInput.creature.value}
                    onChange={(v) =>
                      setFormInput({
                        ...formInput,
                        creature: {
                          ...formInput["creature"],
                          value: v.target.value.replace(/^0+/, ""),
                        },
                      })
                    }
                  />
                </Col>
                <Col sm={5}>
                  <Button onClick={searchFootprintById}>
                    <IconSearch width={15} height={15} color={"#fff"} />
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBasicNameVn">
              <Form.Label>Tên tiếng việt:</Form.Label>
              <Form.Control
                // className={valid.valid ? null : "form-control is-invalid"}
                type="text"
                value={formInput.name_vn.value}
                readOnly
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicNameLt">
              <Form.Label>Tên latin:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.name_latin.value}
                readOnly
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicNameEn">
              <Form.Label>Tên tiếng anh:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.name_en.value}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    name_en: {
                      isValid: e.target.value !== "",
                      validMessage: "Don't allow empty string",
                      minLength: 1,
                      value: e.target.value,
                    },
                  })
                }
                className={
                  formInput.name_en.isValid ? null : "form-control is-invalid"
                }
              />
              {!formInput.name_en.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_en.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicImage">
              <Form.Label className="mr-3">Chọn ảnh:</Form.Label>
              <Button
                onClick={() => {
                  getListImages();
                  setShowImage(true);
                }}
              >
                <IconPlus width={15} height={15} color={"#fff"} />
              </Button>
              {formInput.img && formInput.img.url ? (
                <div className="mt-3">
                  <img
                    src={formInput.img.url}
                    alt="Not Found"
                    style={{ width: "200px" }}
                  />
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={updateHandler}>
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
          <Modal.Title>Xóa mẫu gỗ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa mẫu gỗ của "' +
            (currentTS ? currentTS.name_vn : "") +
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

      {/* show image */}
      <Modal
        show={showImage}
        onHide={() => setShowImage(false)}
        backdrop="static"
        keyboard={false}
        className="show-image-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chọn ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Tên"
              aria-label="name"
              id="image-name"
              aria-describedby="basic-addon1"
              value={imageSearch.name}
              onChange={(v) => {
                const name = v.target.value;
                setImageSearch((prev) => ({ ...prev, name: name }));
              }}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  setFilterImageList({
                    ...filterImageList,
                    name: imageSearch.name,
                  });
                }
              }}
            />
          </InputGroup>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Tên ảnh</th>
              </tr>
            </thead>
            <tbody>
              {listImages &&
                listImages.images.map((e, i) => {
                  let beginIndex = listImages.pages.begin;
                  return (
                    <tr
                      key={i}
                      onClick={() => {
                        setFormInput({
                          ...formInput,
                          img: {
                            value: parseInt(e.id),
                            url: e.url,
                            isValid: true,
                            validMessage: "Don't allow empty string",
                            minLength: 1,
                          },
                        });
                        setShowImage(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{beginIndex + i}</td>
                      <td>
                        <img
                          src={e.url}
                          alt="error"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{e.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="pagination mt-4 d-flex justify-content-center">
            {listImages ? (
              <Pagination
                pagination={listImages.pages}
                callFetchList={changePageImageList}
              />
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImage(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TimberSample);
