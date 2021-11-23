import React, { useCallback, useEffect, useState } from "react";
import "./Question.css";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../store/utilities/apiConfig";
import * as actionTypes from "../../../store/actions/actionTypes";
import {
  Modal,
  Button,
  Table,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Pagination from "../../../components/Panigation/Pagination";
import {
  validateLength,
  getIndexListPage,
} from "../../../store/utilities/common";
import { apiKeyEditor } from "../../../constant";
import {
  IconPlus,
  IconRefresh,
  IconSearch,
  IconFilter,
  IconCheck,
  IconMultiply,
  IconView,
  IconEdit,
  IconGarbage2,
} from "../../../store/utilities/SVG";
import Filter from "./Filter/Filter";
import { colors } from "../../../store/utilities/contants";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    category: state.category,
    listImages: state.listImages,
    question: state.questions
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
    createPost: (payload) => {
      dispatch({
        type: actionTypes.CREATE_POST,
        payload,
      });
    },
    setCategory: (payload) =>
      dispatch({
        type: actionTypes.SET_CATEGORY_LIST,
        payload,
      }),
    setListImages: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_IMAGES,
        payload,
      }),
    setQuestions: (payload) =>
      dispatch({
        type: actionTypes.SET_QUESTIONS_LIST,
        payload,
      }),
  };
};

const Question = (props) => {
  const {
    auth,
    posts,
    setLoader,
    setPosts,
    setQuestions,
    category,
    setCategory,
    setListImages,
    listImages,
  } = props;

  // const [showFilter, setShowFilter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [showImage, setShowImage] = useState({
    active: false,
    callback: null,
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imageSearch, setImageSearch] = useState({
    name: "",
  });

  const [initInfoPost, setInitInfoPost] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    category: null,
    description: "",
    is_publish: false,
    language: 'vn'
  });

  const [infoPost, setInfoPost] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    category: null,
    language: "vn",
    description: "",
    is_publish: false,
  });

  const [validAttr, setValidAttr] = useState({
    title: {
      value: false,
      message: ">= 4 ký tự",
    },
    description: {
      value: false,
      message: ">= 4 ký tự",
    },
  });

  const [currItem, setCurrItem] = useState(null);

  const [filterList, setFilterList] = useState({
    // posts
    page: 1,
    limit: 10,
    // is_publish: "all",
  });
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterImageList, setFilterImageList] = useState({
    name: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "category",
      params: {
        page: 1,
        limit: 1000,
      },
    }).then((res) => {
      setCategory(res.data.data);
      setLoader(false);
    });
  }, [setLoader, setCategory]);

  const getPostList = useCallback(
    (page) => {
      if (filterList.is_publish === "Tất cả") filterList.is_publish = "all";
      console.log(filterList);
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

        const { begin, end } = getIndexListPage(
          filterList.page,
          filterList.limit,
          res.data.data.total
        );
        res.data.data.pages.begin = begin;
        res.data.data.pages.end = end;

        setPosts(res.data.data);
      });
    },
    [auth.token, filterList, setLoader, setPosts]
  );

  const getQuestionList = useCallback(
    (page) => {
      setLoader(true);
      axios({
        method: "get",
        url: baseUrl + "question",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        params: filterList,
      }).then((res) => {
        setLoader(false);

        const { begin, end } = getIndexListPage(
          filterList.page,
          filterList.limit,
          res.data.data.total
        );
        res.data.data.pages.begin = begin;
        res.data.data.pages.end = end;
        
        setQuestions(res.data.data);
      });
    },
    [auth.token, filterList, setLoader, setQuestions]
  );

  useEffect(() => {
    getPostList();
    getQuestionList();
  }, [getPostList, getQuestionList]);

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
    // watcher
    getListImages();
  }, [filterImageList, getListImages]);

  useEffect(() => {
    if (category) {
      setInfoPost({
        id: null,
        title: "",
        content: "",
        images: "",
        category:
          category && category.category.length
            ? category.category[0]["id"]
            : null,
        description: "",
        is_publish: false,
        language: 'vn'
      });
      setInitInfoPost({
        id: null,
        title: "",
        content: "",
        images: "",
        category:
          category && category.category.length
            ? category.category[0]["id"]
            : null,
        description: "",
        is_publish: false,
        language: 'vn'
      });
    }
  }, [category]);

  const editHandle = () => {
    const is_publish = infoPost.is_publish === "true" ? true : false;
    if (
      !checkValid(infoPost, "title") ||
      !checkValid(infoPost, "description")
    ) {
    } else {
      const imagesRemove = oldImages
        .filter((e) => !infoPost.content.includes(e.url))
        .map((e) => e.id);
      setLoader(true);
      axios({
        method: "put",
        url: baseUrl + "auth/posts/" + infoPost.id,
        data: {
          ...infoPost,
          imageAdd: [...images.map((e) => e.id)],
          imagesRemove,
          is_publish,
        },
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then(() => {
          setShowEdit(false);
          getPostList();
        })
        .catch((err) => {
          setShowEdit(false);
          setLoader(false);
        });
    }
  };

  const deleteHandle = () => {
    setLoader(true);
    axios({
      method: "delete",
      url: baseUrl + "auth/posts/" + currItem.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    }).then((res) => {
      setShowDelete(false);
      getPostList();
    });
  };

  const saveHandle = () => {
    const imageId = images.map((e) => e.id);
    const is_publish = infoPost.is_publish === "true" ? true : false;
    if (
      !checkValid(infoPost, "title") ||
      !checkValid(infoPost, "description")
    ) {
    } else {
      setLoader(true);
      axios({
        method: "post",
        url: baseUrl + "auth/posts",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: {
          ...infoPost,
          images: imageId,
          is_publish,
        },
      })
        .then((res) => {
          setShowCreate(false);
          getPostList();
          setLoader(false);
          setInfoPost(initInfoPost);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err.response.data);
        });
    }
  };

  const checkValid = (infoPost, attr) => {
    if (attr === "title") {
      if (validateLength(infoPost.title, 4) === "incorrect") {
        setValidAttr((prev) => {
          return { ...prev, title: { ...prev.title, value: true } };
        });
        return false;
      } else {
        setValidAttr((prev) => {
          return { ...prev, title: { ...prev.title, value: false } };
        });
      }
    }
    if (attr === "description") {
      if (validateLength(infoPost.description, 4) === "incorrect") {
        setValidAttr((prev) => {
          return { ...prev, description: { ...prev.description, value: true } };
        });
        return false;
      } else {
        setValidAttr((prev) => {
          return {
            ...prev,
            description: { ...prev.description, value: false },
          };
        });
      }
    }
    return true;
  };

  const previewPost = (id) => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "auth/posts/" + id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => {
        setCurrItem(res.data.data);
        setLoader(false);
        setShowPreview(true);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const imagesHandler = (item) => {
    const newImages = [...images, item];
    setImages(newImages);
    showImage.callback(item.url, { title: item.name });
    setShowImage({
      active: false,
      callback: null,
    });
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  const changePageImageList = (page) => {
    setFilterImageList({
      ...filterImageList,
      page,
    });
  };

  const onSearchHandler = (filter) => {
    setFilterList({ ...filterList, ...filter });
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
                setImages([]);
              }}
            >
              <IconPlus width={15} height={15} color={"#fff"} />
            </Button>
            <Button
              className="mr-2"
              onClick={() => {
                setSearchKeyword("");
                setFilterList({
                  // reset filter
                  page: 1,
                  limit: 10,
                });
              }}
            >
              <IconRefresh width={15} height={15} color={"#fff"} />
            </Button>
            <Button className="mr-2" onClick={() => setShowFilter(true)}>
              <IconFilter width={15} height={15} color={"#fff"} />
            </Button>
          </div>
          <Form inline className="searchCp">
            <FormControl
              type="text"
              placeholder=""
              className="mr-sm-2"
              onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
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
          {/* <Button
              className="mr-2"
              onClick={() => {
                setShowFilter(true);
              }}
            >
              Filter
            </Button> */}
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="d-flex justify-content-center align-item-center">
                #
              </th>
              <th>Tiêu đề</th>
              {/* <th>Danh mục</th> */}
              <th className="d-flex justify-content-center align-item-center">
                Công khai
              </th>
              {/* <th>Ngôn ngữ</th> */}
              <th>Ngày tạo</th>
              <th className="d-flex justify-content-center align-item-center">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.posts.length ? (
              posts.posts.map((e, i) => {
                let beginIndex = posts.pages.begin;
                return (
                  <tr key={i}>
                    <td className="d-flex justify-content-center align-item-center">
                      {beginIndex + i}
                    </td>
                    <td>{e.title}</td>
                    {/* <td>{e.categorytitle}</td> */}
                    <td className="d-flex justify-content-center align-item-center">
                      {e.is_publish === "1" ? (
                        <IconCheck
                          width={15}
                          height={15}
                          color={colors.active}
                        />
                      ) : (
                        <IconMultiply
                          width={15}
                          height={15}
                          color={colors.dangerous}
                        />
                      )}
                    </td>
                    {/* <td>{e.language === "vn" ? "Việt" : "English"}</td> */}
                    <td>{e.created_at}</td>
                    <td className="d-flex justify-content-around align-item-center">
                      <div
                        className="icon d-flex align-items-center"
                        onClick={() => previewPost(e.id)}
                      >
                        <IconView color={"#333333"} width={15} height={15} />
                      </div>
                      <div
                        className="icon d-flex align-items-center"
                        onClick={() => {
                          setShowEdit(true);
                          setInfoPost({
                            ...e,
                            is_publish: e.is_publish === "0" ? false : true,
                          });
                          setImages(e.image);
                          setOldImages(e.image);
                        }}
                      >
                        <IconEdit color={"#333333"} width={15} height={15} />
                      </div>
                      <div
                        className="icon d-flex align-items-center"
                        onClick={() => {
                          setShowDelete(true);
                          setCurrItem(e);
                        }}
                      >
                        <IconGarbage2
                          color={"#333333"}
                          width={15}
                          height={15}
                        />
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
          {posts ? (
            <Pagination pagination={posts.pages} callFetchList={changePage} />
          ) : null}
        </div>
      </div>

      {/* edit */}
      {/* <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setInfoPost(initInfoPost);
        }}
        backdrop="static"
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên tiêu đề</Form.Label>
              <Form.Control
                className={
                  validAttr.title.value ? "form-control is-invalid" : null
                }
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoPost.title}
                onChange={(v) => {
                  checkValid({ ...infoPost, title: v.target.value }, "title");
                  setInfoPost({ ...infoPost, title: v.target.value });
                }}
              />
              {validAttr.title.value ? (
                <Form.Control.Feedback type="invalid">
                  {validAttr.title.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicTitleDescription">
              <Form.Label>Miêu tả</Form.Label>
              <Form.Control
                className={
                  validAttr.description.value ? "form-control is-invalid" : null
                }
                as="textarea"
                rows={3}
                type="title"
                placeholder="Nhập miêu tả"
                value={infoPost.description}
                onChange={(v) => {
                  checkValid(
                    { ...infoPost, description: v.target.value },
                    "description"
                  );
                  setInfoPost({ ...infoPost, description: v.target.value });
                }}
              />
              {validAttr.description.value ? (
                <Form.Control.Feedback type="invalid">
                  {validAttr.description.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Danh mục</Form.Label>
              {category ? (
                <Form.Control
                  as="select"
                  onChange={(v) =>
                    setInfoPost({ ...infoPost, category: v.target.value })
                  }
                  defaultValue={infoPost.category}
                >
                  {category.category.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name_vn}
                    </option>
                  ))}
                </Form.Control>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicMode">
              <Form.Label>Chế độ</Form.Label>
              <Form.Control
                as="select"
                defaultValue={infoPost.is_publish}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, is_publish: v.target.value })
                }
              >
                <option value={true}>Public</option>
                <option value={false}>Private</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicMode">
              <Form.Label>Loại ngôn ngữ</Form.Label>
              <Form.Control
                as="select"
                defaultValue={infoPost.language}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, language: v.target.value })
                }
              >
                <option value={"vn"}>Việt Nam</option>
                <option value={"en"}>English</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicContent">
              <Form.Label>Nội dung</Form.Label>
              <Editor
                apiKey={apiKeyEditor}
                init={{
                  body_id: "my_edit",
                  height: 800,
                  width: "100%",
                  menubar: true,
                  automatic_uploads: true,
                  file_picker_types: "image",
                  file_picker_callback: (callback) => {
                    setShowImage({
                      active: true,
                      callback,
                    });
                  },
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar1:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  toolbar2: "forecolor backcolor emoticons",
                }}
                value={infoPost.content}
                onEditorChange={(value) => {
                  setInfoPost({ ...infoPost, content: value });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEdit(false);
              setInfoPost(initInfoPost);
            }}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={editHandle}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => {
          setInfoPost(initInfoPost);
          setShowCreate(false);
        }}
        backdrop="static"
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {category && category.category.length ? (
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Tên tiêu đề</Form.Label>
                <Form.Control
                  className={
                    validAttr.title.value ? "form-control is-invalid" : null
                  }
                  type="title"
                  placeholder="Nhập tên danh mục"
                  value={infoPost.title}
                  onChange={(v) => {
                    checkValid({ ...infoPost, title: v.target.value }, "title");
                    setInfoPost({ ...infoPost, title: v.target.value });
                  }}
                />
                {validAttr.title.value ? (
                  <Form.Control.Feedback type="invalid">
                    {validAttr.title.message}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formBasicTitleDescription">
                <Form.Label>Miêu tả</Form.Label>
                <Form.Control
                  className={
                    validAttr.description.value
                      ? "form-control is-invalid"
                      : null
                  }
                  as="textarea"
                  rows={3}
                  type="title"
                  placeholder="Nhập miêu tả"
                  value={infoPost.description}
                  onChange={(v) => {
                    checkValid(
                      { ...infoPost, description: v.target.value },
                      "description"
                    );
                    setInfoPost({ ...infoPost, description: v.target.value });
                  }}
                />
                {validAttr.description.value ? (
                  <Form.Control.Feedback type="invalid">
                    {validAttr.description.message}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formBasicCategory">
                <Form.Label>Danh mục</Form.Label>
                {category && category.category.length > 0 ? (
                  <Form.Control
                    as="select"
                    onChange={(v) =>
                      setInfoPost({ ...infoPost, category: v.target.value })
                    }
                    defaultValue={category.category[0].id}
                  >
                    {category.category.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name_vn}
                      </option>
                    ))}
                  </Form.Control>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formBasicMode">
                <Form.Label>Chế độ</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={false}
                  onChange={(v) =>
                    setInfoPost({ ...infoPost, is_publish: v.target.value })
                  }
                >
                  <option value={true}>Public</option>
                  <option value={false}>Private</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicMode">
                <Form.Label>Loại ngôn ngữ</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={infoPost.language}
                  onChange={(v) =>
                    setInfoPost({ ...infoPost, language: v.target.value })
                  }
                >
                  <option value={"vn"}>Việt Nam</option>
                  <option value={"en"}>English</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicContent">
                <Form.Label>Nội dung</Form.Label>
                <Editor
                  //   onEditorChange={onDescriptionChangeHandler}
                  apiKey={apiKeyEditor}
                  //   initialValue={creature.description.replaceAll("<br />", "")}
                  images_upda
                  init={{
                    height: 800,
                    width: "100%",
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
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
                  value={infoPost.content}
                  onEditorChange={(value) =>
                    setInfoPost({ ...infoPost, content: value })
                  }
                />
              </Form.Group>
            </Form>
          ) : (
            "Tạo một danh mục trước khi tạo bài viết"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setInfoPost(initInfoPost);
              setShowCreate(false);
            }}
          >
            Đóng
          </Button>
          {category && category.category.length > 0 ? (
            <Button variant="primary" onClick={saveHandle}>
              Lưu
            </Button>
          ) : null}
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
          <Modal.Title>Xóa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currItem ? 'Bạn có chắc muốn xóa "' + currItem.title + '" ?' : null}
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

      {/* show preview */}
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Tiêu đề:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.title : ""}
            </div>
          </div>
          {/* <div className="d-flex">
            <div className="p-2 font-weight-bold">Miêu tả:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.description : ""}
            </div>
          </div> */}
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Chế độ:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem
                ? currItem.is_publish === "0"
                  ? "private"
                  : "public"
                : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Ngày tạo:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.created_at : ""}
            </div>
          </div>
          {/* <div className="d-flex">
            <div className="p-2 font-weight-bold">Người tạo:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.created_by : ""}
            </div>
          </div> */}
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
                __html: currItem ? currItem.content : "",
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

      {/* show image */}
      {/* <Modal
        show={showImage.active}
        onHide={() =>
          setShowImage({
            active: false,
            callback: null,
          })
        }
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
                      onClick={() => imagesHandler(e)}
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
          <Button
            variant="secondary"
            onClick={() => setShowImage({ active: false, callback: null })}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Filter
        show={showFilter}
        closeHandler={() => setShowFilter(false)}
        search={onSearchHandler}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
