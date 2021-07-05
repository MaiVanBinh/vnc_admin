import React, { useState, useEffect, useCallback } from "react";
import "./Creatures.css";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Table,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import { apiKeyEditor } from "./../../../constant";
import { Editor } from "@tinymce/tinymce-react";
import {
  validateLength,
  getIndexListPage,
} from "../../../store/utilities/common";
import Pagination from "./../../../components/Panigation/Pagination";
import {
  IconPlus,
  IconRefresh,
  IconView,
  IconEdit,
  IconGarbage2,
  IconFilter,
  IconSearch,
} from "./../../../store/utilities/SVG";
import Filter from "./Filter/Filter";

// const findElementNotIn = (arr1, arr2) => {
//   const newArr = [];
//   const length = arr1.length;
//   for (let i = 0; i < length; i++) {
//     if (arr2.findIndex((item) => item === arr1[i]) < 0) {
//       newArr.push(arr1[i]);
//     }
//   }
//   return newArr;
// };

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    creatures: state.creatures,
    listImages: state.listImages,
    species: state.creaturesCategories
      ? state.creaturesCategories.species
      : null,
    orders: state.creaturesCategories ? state.creaturesCategories.orders : null,
    groups: state.creaturesCategories ? state.creaturesCategories.groups : null,
    families: state.creaturesCategories
      ? state.creaturesCategories.families
      : null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCreatures: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_CREATURES,
        payload,
      }),
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
    setListImages: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_IMAGES,
        payload,
      }),
  };
};

const Creatures = (props) => {
  const {
    auth,
    creatures,
    species,
    orders,
    families,
    groups,
    setCreatures,
    setLoader,
    setListImages,
    listImages,
    setCreaturesCategories
  } = props;
  const [showPreview, setShowPreview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [listAuthors, setListAuthor] = useState(null);
  const [images, setImages] = useState([]);
  const [showFilter, setShowFilter] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [imageSearch, setImageSearch] = useState({
    name: "",
  });

  const [filterImageList, setFilterImageList] = useState({
    name: "",
    page: 1,
    limit: 10,
  });

  const [formInput, setFormInput] = useState({
    name_vn: {
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
    redbook_level: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    species: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    order: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    group: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    family: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    author: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    description: {
      value: "",
      isValid: true,
      validMessage: "Don't allow empty string",
    },
  });

  const resetFormInput = () => {
    setFormInput({
      name_vn: {
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
      redbook_level: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      species: {
        value: parseInt(species[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      order: {
        value: parseInt(orders[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      group: {
        value: parseInt(groups[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      family: {
        value: parseInt(families[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      author: {
        value: parseInt(listAuthors[0].id),
        isValid: true,
        validMessage: "Don't allow empty string",
      },
      description: {
        value: "",
        isValid: true,
        validMessage: "Don't allow empty string",
      },
    });
  };

  const [filterList, setFilterList] = useState({
    page: 1,
    limit: 10,
  });

  const [showImage, setShowImage] = useState(false);

  const infoCreatures = useState(null)[0];
  const getCreaturesList = useCallback(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "creatures",
      params: filterList,
    }).then((res) => {
      const { begin, end } = getIndexListPage(
        filterList.page,
        filterList.limit,
        res.data.data.total
      );
      res.data.data.pages.begin = begin;
      res.data.data.pages.end = end;
      setCreatures(res.data.data);
      setLoader(false);
    });
  }, [setCreatures, setLoader, filterList]);

  useEffect(() => {
    getCreaturesList();
  }, [filterList, getCreaturesList]);

  const getCreaturesCategories = useCallback(() => {
    
    axios({
      method: "get",
      url: baseUrl + "filterData",
    }).then((res) => {
      setCreaturesCategories(res.data.data);
      setLoader(false);
    });
  }, [setLoader, setCreaturesCategories]);

  const getListAuthor = useCallback(() => {
    axios({
      method: "get",
      url: baseUrl + "author?all",
    }).then((res) => {
      setListAuthor(res.data.data);
      setLoader(false);
    });
  }, [setLoader, setListAuthor]);

  useEffect(() => {
    getCreaturesCategories();
    getListAuthor();
  }, [getCreaturesCategories, getListAuthor]);

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
  }, [setLoader, setListImages, auth.token, filterImageList]);

  useEffect(() => {
    getListImages();
  }, [filterImageList, getListImages]);

  

  const changePageImageList = (page) => {
    setFilterImageList({
      ...filterImageList,
      page,
    });
  };

  const imagesHandler = (item) => {
    let imageUpdate = [...images];
    const index = images.findIndex((e) => e.id === item.id);
    if (index >= 0) {
      imageUpdate.splice(index, 1);
    } else {
      imageUpdate.push(item);
    }
    setImages(imageUpdate);
  };

  const checkChooseImage = (imageId) => {
    const index = images.findIndex((e) => e.id === imageId);
    if (index >= 0) {
      return true;
    }
    return false;
  };


  const openViewModal = (id) => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "creatures/" + id,
    }).then((res) => {
      setCurrItem(res.data.data);
      setShowPreview(true);
      setLoader(false);
    });
  };

  const saveImageChoose = () => {
    // console.log(images);
  };

  const openDeleteModal = (item) => {
    setCurrItem(item);
    setShowDelete(true);
  };

  const editHandle = () => {
    const data = preprocessInput();
    if (!data) {
      return;
    }
    data.images = [...images.map((item) => item.id)];
    setLoader(true);
    axios({
      method: "put",
      url: baseUrl + "auth/creatures/" + currItem.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        getCreaturesList();
        setShowEdit(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/creatures/" + currItem.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setShowDelete(false);
        getCreaturesList();
      })
      .catch((err) => {
        setLoader(false);
        setShowDelete(false);
        alert("Xóa không thành công.");
      });
  };

  const preprocessInput = () => {
    let inputValue = {};
    let isValid = true;
    const formInputUpdate = { ...formInput };
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
    data.images = [...images.map((item) => item.id)];
    setLoader(true);
    axios({
      method: "post",
      url: baseUrl + "auth/creatures",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    })
      .then((res) => {
        setShowCreate(false);
        getCreaturesList();
      })
      .catch((err) => {
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

  const openEditModal = (id) => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "creatures/" + id,
    }).then((res) => {
      const updateFormInput = { ...formInput };
      for (let key in updateFormInput) {
        if (key !== "id") {
          updateFormInput[key].value = res.data.data[key];
        }
      }
      setCurrItem(res.data.data);
      setImages(res.data.data["images"]);
      setFormInput(updateFormInput);
      setShowEdit(true);
      setLoader(false);
    });
  };

  const onSearchHandler = (filter) => {
    setFilterList({...filterList, ...filter, page: 1});
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
                setImages([]);
              }}
            >
              <IconPlus width={15} height={15} color={"#fff"} />
            </Button>
            <Button onClick={() => {
              setFilterList({
                // reset filter
                page: 1,
                limit: 10,
              });
              setSearchKeyword('');
            }} className="mr-2">
              <IconRefresh width={15} height={15} color={"#fff"} />
            </Button>
            <Button onClick={() => setShowFilter(true)}>
              <IconFilter width={15} height={15} color={"#fff"} />
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

        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Việt Nam</th>
              <th>Tên Latin</th>
              <th>Avatar</th>
              <th>Người tạo</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {creatures && creatures.creatures.length > 0 ? (
              creatures.creatures.map((e, i) => {
                let beginIndex = creatures.pages.begin;
                return (
                  <tr key={i}>
                    <td>{beginIndex + i}</td>
                    <td>{e.name_vn}</td>
                    <td>{e.name_latin}</td>
                    <td>
                      <img
                        src={e.avatar}
                        style={{ height: "75px", width: "100px" }}
                        alt=""
                      />
                    </td>
                    <td>{e.created_by}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <div className="action-group d-flex justify-content-center">
                        <div
                          className="icon d-flex align-items-center"
                          onClick={() => openViewModal(e.id)}
                        >
                          <IconView color={"#333333"} width={15} height={15} />
                        </div>
                        <div
                          className="icon d-flex align-items-center"
                          onClick={() => openEditModal(e.id)}
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
          {creatures ? (
            <Pagination
              pagination={creatures.pages}
              callFetchList={changePage}
            />
          ) : null}
        </div>
      </div>

      {/* show preview */}
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Tên tiếng việt:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.name_vn : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Tên latin:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.name_latin : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Redbook level:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.redbook_level : "Không thuộc sách đỏ"}
            </div>
          </div>
          <div>
            <div className="p-2 font-weight-bold">Ảnh:</div>
            <div className="p-2 d-flex flex-wrap">
              {currItem && currItem.images && currItem.images.length > 0
                ? currItem.images.map((e) => (
                    <div className="d-flex flex-wrap p-2">
                      <img
                        src={e.url}
                        alt="err"
                        width="200px"
                        height="200px"
                        style={{
                          border: "1px solid #000",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">tác giả:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.author_name : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Loài:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.species_vn : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Lớp:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.group_vn : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Bộ:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.order_vn : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Họ:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.family_vn : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Ngày tạo:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.created_at : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Người tạo:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.created_by : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Ngày sửa cuối:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.updated_at : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Người sửa cuối:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.updated_by : ""}
            </div>
          </div>
          <div>
            <div className="p-2 font-weight-bold">Nội dung:</div>
            <div
              className="p-2 flex-sm-grow-1"
              dangerouslySetInnerHTML={{
                __html:
                  currItem && currItem.description
                    ? currItem.description.replaceAll("<br />", "")
                    : "",
              }}
            ></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Sinh Vật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicNameVn">
              <Form.Label>Tên Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên latin"
                value={formInput.name_latin.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Hình ảnh</Form.Label>
              <Button onClick={() => setShowImage(true)}>Thêm hình ảnh</Button>
              <div className="p-2 d-flex flex-wrap">
                {images && images.length > 0
                  ? images.map((e) => (
                      <div className="d-flex flex-wrap p-2">
                        <img
                          src={e.url}
                          alt="err"
                          width="200px"
                          height="200px"
                          style={{
                            border: "1px solid #000",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Loài</Form.Label>
              {species && species.length > 0 ? (
                <Form.Control
                  name="species"
                  as="select"
                  onChange={onChangeInput}
                  value={parseInt(formInput.species.value)}
                  defaultValue={parseInt(species[0].id)}
                >
                  {species.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formgroups">
              <Form.Label>Lớp</Form.Label>
              {groups && groups.length > 0 ? (
                <Form.Control
                  name="group"
                  as="select"
                  onChange={onChangeInput}
                  value={parseInt(formInput.group.value)}
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

            <Form.Group controlId="formorders">
              <Form.Label>Bộ</Form.Label>
              {orders && orders.length > 0 ? (
                <Form.Control
                  name="order"
                  as="select"
                  onChange={onChangeInput}
                  value={parseInt(formInput.order.value)}
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
            <Form.Group controlId="formorders">
              <Form.Label>Họ</Form.Label>
              {families && families.length > 0 ? (
                <Form.Control
                  name="family"
                  as="select"
                  onChange={onChangeInput}
                  value={parseInt(formInput.family.value)}
                  defaultValue={parseInt(families[0].id)}
                >
                  {families.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Tác giả</Form.Label>
              {listAuthors && listAuthors.length > 0 ? (
                <Form.Control
                  name="author"
                  as="select"
                  onChange={onChangeInput}
                  value={parseInt(formInput.author.value)}
                  defaultValue={parseInt(listAuthors[0].id)}
                >
                  {listAuthors.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formRedBookLevel">
              <Form.Label>Xếp hạng sách đỏ</Form.Label>
              <Form.Control
                className={
                  formInput.redbook_level.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="redbook_level"
                placeholder="Xếp hạng sách đỏ"
                value={formInput.redbook_level.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicContent">
              <Form.Label>Nội dung</Form.Label>
              <Editor
                apiKey={apiKeyEditor}
                images_upda
                init={{
                  height: 800,
                  width: "100%",
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar1:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  toolbar2: "forecolor backcolor emoticons",
                  automatic_uploads: true,
                }}
                value={
                  formInput && formInput.description
                    ? formInput.description.value.replaceAll("<br />", "")
                    : ""
                }
                onEditorChange={(value) =>
                  onChangeInput({
                    target: { name: "description", value: value },
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
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
        onHide={() => {
          setShowCreate(false);
          resetFormInput();
        }}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Sinh Vật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicNameVn">
              <Form.Label>Tên Tiếng Việt</Form.Label>
              <Form.Control
                className={
                  formInput.name_vn.isValid ? null : "form-control is-invalid"
                }
                type="text"
                name="name_vn"
                placeholder="Nhập tên tiếng việt"
                value={formInput.name_vn.value}
                onChange={onChangeInput}
              />
              {!formInput.name_vn.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_vn.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên Latin</Form.Label>
              <Form.Control
                className={
                  formInput.name_latin.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="name_latin"
                placeholder="Nhập tên latin"
                value={formInput.name_latin.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.validMessage}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Hình ảnh</Form.Label>
              <Button onClick={() => setShowImage(true)}>Thêm hình ảnh</Button>
              <div className="p-2 d-flex flex-wrap">
                {images && images.length > 0
                  ? images.map((e) => (
                      <div className="d-flex flex-wrap p-2">
                        <img
                          src={e.url}
                          alt="err"
                          width="200px"
                          height="200px"
                          style={{
                            border: "1px solid #000",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Loài</Form.Label>
              {species && species.length > 0 ? (
                <Form.Control
                  name="species"
                  as="select"
                  onChange={onChangeInput}
                  value={formInput.species.value}
                  defaultValue={parseInt(species[0].id)}
                >
                  {species.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formgroups">
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

            <Form.Group controlId="formorders">
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
            <Form.Group controlId="formorders">
              <Form.Label>Họ</Form.Label>
              {families && families.length > 0 ? (
                <Form.Control
                  name="family"
                  as="select"
                  onChange={onChangeInput}
                  defaultValue={parseInt(families[0].id)}
                >
                  {families.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Tác giả</Form.Label>
              {listAuthors && listAuthors.length > 0 ? (
                <Form.Control
                  name="author"
                  as="select"
                  onChange={onChangeInput}
                  defaultValue={parseInt(listAuthors[0].id)}
                >
                  {listAuthors.map((e, i) => (
                    <option key={i} value={parseInt(e.id)}>
                      {e.name}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formRedBookLevel">
              <Form.Label>Xếp hạng sách đỏ</Form.Label>
              <Form.Control
                className={
                  formInput.redbook_level.isValid
                    ? null
                    : "form-control is-invalid"
                }
                type="text"
                name="redbook_level"
                placeholder="Xếp hạng sách đỏ"
                value={formInput.redbook_level.value}
                onChange={onChangeInput}
              />
              {!formInput.name_latin.isValid ? (
                <Form.Control.Feedback type="invalid">
                  {formInput.name_latin.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicContent">
              <Form.Label>Nội dung</Form.Label>
              <Editor
                apiKey={apiKeyEditor}
                images_upda
                init={{
                  height: 800,
                  width: "100%",
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar1:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  toolbar2: "forecolor backcolor emoticons",
                  automatic_uploads: true,
                  file_picker_types: "image",
                  file_picker_callback: (callback) => {
                    setShowImage({
                      active: true,
                      callback,
                    });
                  },
                }}
                value={infoCreatures ? "" : ""}
                onEditorChange={(value) =>
                  onChangeInput({
                    target: { name: "description", value: value },
                  })
                }
              />
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
          <Modal.Title>Xóa sinh vật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {'Bạn có chắc muốn xóa "' +
            (currItem ? currItem.name_vn + '" ?' : null)}
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
                <th>Chọn</th>
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
                      onClick={() => imagesHandler(e)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        {" "}
                        <Form.Check
                          type="checkbox"
                          checked={checkChooseImage(e.id)}
                        />
                      </td>
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
          <Button
            variant="secondary"
            onClick={() => {
              setShowImage(false);
              saveImageChoose();
            }}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Filter
        show={showFilter}
        closeHandler={() => setShowFilter(false)}
        search={onSearchHandler}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Creatures);
