import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Footprint.css";
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
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import Pagination from "./../../../components/Panigation/Pagination";
import {
  getIndexListPage,
  validateLength,
} from "./../../../store/utilities/common";
import {
  IconPlus,
  IconRefresh,
  IconView,
  IconEdit,
  IconGarbage2,
  IconSearch,
} from "./../../../store/utilities/SVG";
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    footprints: state.footprints,
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
    setFootprints: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_FOOTPRINTS,
        payload,
      }),
    setListImages: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_IMAGES,
        payload,
      }),
  };
};

const Footprint = (props) => {
  const {
    auth,
    setLoader,
    footprints,
    setFootprints,
    listImages,
    setListImages,
  } = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [currentFootprint, setCurrentFootprint] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordCreature, setSearchKeywordCreature] = useState("");
  const [hintCreatures, setHintCreature] = useState(null);
  const [creature, setCreatures] = useState({
    id: 0,
  });
  const inputEl = useRef(null);
  const autocomplete = useRef(null);

  const [imageSearch, setImageSearch] = useState({
    name: "",
  });
  const [filterImageList, setFilterImageList] = useState({
    name: "",
    page: 1,
    limit: 10,
  });
  const [formInput, setFormInput] = useState({
    id: {
      value: null,
      isValid: true,
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
    avatar: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
      minLength: 1,
    },
  });

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (
        inputEl.current &&
        formInput.name_vn.value === inputEl.current.value &&
        formInput.name_vn.value !== "" &&
        !formInput.name_vn.id
      ) {
        axios({
          method: "get",
          url: baseUrl + "creatures",
          params: {
            all: true,
            keyword: formInput.name_vn.value.trim(),
          },
        }).then((res) => {
          if (res.data.data.creature.length === 1) {
            setHintCreature(null);
            setFormInput({
              ...formInput,
              id: {
                ...formInput.id,
                value: res.data.data.creature[0]["id"],
              },
              name_vn: {
                ...formInput.name_vn,
                value: res.data.data.creature[0]["name_vn"],
              },
              name_latin: {
                ...formInput.name_latin,
                value: res.data.data.creature[0].name_latin,
              },
            });
          } else {
            setHintCreature(res.data.data.creature);
          }
        });
      }
    }, 500);
    return () => clearTimeout(timer1);
  }, [formInput.name_vn.value]);

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  });
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
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setFootprints(res.data.data);
      setLoader(false);
    });
  }, [auth.token, filterList, setFootprints, setLoader]);

  useEffect(() => {
    getFootprint();
  }, [filterList, getFootprint]);

  const resetFormInput = () => {
    setFormInput({
      id: {
        value: null,
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
      avatar: {
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
  }, [setListImages, setLoader, auth.token, filterImageList]);

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
    setCurrentFootprint(item);
  };

  const openEditModal = (item) => {
    const formInputUpdate = { ...formInput };
    formInput.name_vn.value = item.creatures;
    formInputUpdate.name_en.value = item.name_en;
    formInputUpdate.name_vn.value = item.name_vn;
    formInputUpdate.name_latin.value = item.name_latin;
    formInputUpdate.avatar.value = item.avatarId;
    formInputUpdate.avatar.url = item.avatar;
    setCreatures({
      id: item.creatures,
      name_en: item.name_en,
      name_vn: item.name_vn,
      name_latin: item.name_latin,
    });
    setFormInput(formInputUpdate);
    setCurrentFootprint(item);
    setShowEdit(true);
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/footprint/" + currentFootprint.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setShowDelete(false);
        getFootprint();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert(
          "Xóa không thành công. Xóa những bài viết thuộc danh mục này trước."
        );
      });
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  const preprocessInput = () => {
    if (formInput.id && formInput.name_en.value && formInput.avatar.value) {
      let inputValue = {};
      for (const key in formInput) {
        inputValue[key] = formInput[key].value;
      }
      return inputValue;
    }
    return false;
  };

  const saveHandle = () => {
    const data = preprocessInput();
    console.log(data);
    if (!data) {
      return;
    }

    setLoader(true);
    axios({
      method: "post",
      url: baseUrl + "auth/footprint",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowCreate(false);
        getFootprint();
      })
      .catch((err) => {
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
      url: baseUrl + "auth/footprint/" + currentFootprint.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowEdit(false);
        getFootprint();
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  return (
    <div className="container-fluid pt-3 pb-5">
      <div className="wrap-action mb-3  d-flex justify-content-between">
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
          <Button
            onClick={() => {
              getFootprint();
              setFilterList({ ...filterList, name: null });
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
          {footprints && footprints.footprint.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có kết quả nào được tìm thấy
              </td>
            </tr>
          ) : null}
          {footprints && footprints.footprint.length > 0
            ? footprints.footprint.map((e, i) => {
                let beginIndex = footprints.pages.begin;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td className="thumbnail">
                      <img src={e.avatar} className="img-fluid" alt="error" />
                    </td>
                    <td className="name">{e.name_vn}</td>
                    <td className="name">{e.name_latin}</td>
                    <td className="name">{e.name_en}</td>
                    <td className="name">{e.creatures}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <div className="action-group d-flex justify-content-center">
                        <div
                          className="icon d-flex align-items-center"
                          // onClick={() => openViewModal(e.id)}
                        >
                          <IconView color={"#333333"} width={15} height={15} />
                        </div>
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
        {footprints ? (
          <Pagination
            pagination={footprints.pages}
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
          <Modal.Title>Thêm dấu chân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Nhập tên sinh vật:</Form.Label>
              <Form.Control
                type="text"
                ref={inputEl}
                placeholder="Nhập tên tiếng việt của sinh vật"
                value={formInput.name_vn.value}
                onChange={(v) => {
                  if (autocomplete.current)
                    autocomplete.current.classList.add("active");
                  setFormInput({
                    ...formInput,
                    name_vn: {
                      ...formInput.name_vn,
                      value: v.target.value.replace(/^\s/, ""),
                    },
                    id: {
                      ...formInput.id,
                      value: null,
                    },
                  });
                }}
                autoComplete="off"
              />
              {hintCreatures && hintCreatures.length > 0 ? (
                <ul className="autocomplete" ref={autocomplete}>
                  {hintCreatures.map((e) => (
                    <li
                      onClick={() => {
                        if (autocomplete.current)
                          autocomplete.current.classList.remove("active");
                        setFormInput({
                          ...formInput,
                          name_vn: {
                            ...formInput.name_vn,
                            value: e.name_vn,
                          },
                          id: {
                            ...formInput.id,
                            value: e.id,
                          },
                          name_latin: {
                            ...formInput.name_latin,
                            value: e.name_latin,
                          },
                        });
                      }}
                    >
                      {e.name_vn}
                    </li>
                  ))}
                </ul>
              ) : !formInput.id.value ? (
                <p>Không có kết quả nào</p>
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
              {formInput.avatar && formInput.avatar.url ? (
                <div className="mt-3">
                  <img
                    src={formInput.avatar.url}
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
          <Modal.Title>Sửa thông tin của dấu chân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Nhập tên sinh vật:</Form.Label>
              <Form.Control
                type="text"
                ref={inputEl}
                value={formInput.name_vn.value}
                readOnly 
                autoComplete="off"
              />
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
              {formInput.avatar && formInput.avatar.url ? (
                <div className="mt-3">
                  <img
                    src={formInput.avatar.url}
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
          <Modal.Title>Xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa dấu chân của "' +
            (currentFootprint ? currentFootprint.name_vn : "") +
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
                          avatar: {
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

export default connect(mapStateToProps, mapDispatchToProps)(Footprint);
