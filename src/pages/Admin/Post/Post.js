import React, { useEffect, useState } from "react";
import "./Post.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Pagination from "react-bootstrap-4-pagination";
import { validateLength } from "../../../store/utilities/common";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    category: state.category,
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
  };
};

const imageArrayToString = (images) => {
  const imagesUrl = images.map((e) => e.url);
  return imagesUrl.join("\n");
};
const Post = (props) => {
  const {
    auth,
    posts,
    setLoader,
    setPosts,
    category,
    setCategory,
    setListImages,
    listImages,
  } = props;

  // const [showFilter, setShowFilter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [currPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState([]);


  const [initInfoPost] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    category: null,
    description: "",
    is_publish: false,
  });

  const [infoPost, setInfoPost] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    category: category ? category[0].id : null,
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

  useEffect(() => {
    getCategoryList();
    getPostList(currPage);
  }, []);

  useEffect(() => {
    setInfoPost({
      id: null,
      title: "",
      content: "",
      images: "",
      category: category ? category[0]["id"] : null,
      description: "",
      is_publish: false,
    });
  }, [category]);

  const getPostList = (page) => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "auth/posts",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: {
        page: page,
        limit: 10,
        is_publish: "true",
      },
    }).then((res) => {
      setLoader(false);
      setPosts(res.data.data.posts);
      setTotalPost(Math.floor(res.data.data.total / 10) + 1);
    });
  };

  const openEdit = (item) => {
    setInfoPost({
      id: item.id,
      title: item.title,
      created_at: item.created_at,
    });
    setShowEdit(true);
  };

  const openDelete = (item) => {
    setInfoPost({
      id: item.id,
      title: item.title,
      created_at: item.created_at,
    });
    setShowDelete(true);
  };

  const editHandle = () => {
    const imagesUpdate = infoPost.images ? infoPost.images.split("\n") : [];
    const is_publish = infoPost.is_publish === "true" ? true : false;
    if (
      !checkValid(infoPost, "title") ||
      !checkValid(infoPost, "description")
    ) {
    } else {
      setLoader(true);
      axios({
        method: "put",
        url: baseUrl + "auth/posts/" + infoPost.id,
        data: {
          ...infoPost,
          images: imagesUpdate,
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
      console.log("delete handle result:", res);
      setShowDelete(false);
      getPostList();
    });
  };

  const saveHandle = () => {
    const imagesUpdate = infoPost.images ? infoPost.images.split("\n") : [];
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
          images: imagesUpdate,
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
        });
    }
  };

  const getCategoryList = () => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "categories",
      params: {
        page: 1,
        limit: 10,
      },
    }).then((res) => {
      setCategory(res.data.data.category);
      setLoader(false);
    });
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

  const getListImages = () => {
    setImages([]);
    setShowImage(true);
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "auth/images",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    }).then((res) => {
      setListImages(res.data.data.images);
      setLoader(false);
    });
  };

  const addImgae = (v, image) => {
    let imagesUpdate = [...images];
    if(v.target.checked) {
      imagesUpdate = [...imagesUpdate, image];
    } else {
      imagesUpdate = images.filter(e => e.id !== image.id);
    }
    setImages(imagesUpdate);
  }

  return (
    <div>
      <div className="container-fluid pt-5 pb-5">
        <div className="wrap-action mb-3">
          <Button className="mr-2" onClick={() => setShowCreate(true)}>
            Tạo bài viết +
          </Button>
          <Button
            className="mr-2"
            onClick={() => {
              getPostList(1);
              setCurrentPage(1);
            }}
          >
            Tải lại danh sách
          </Button>
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
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Chế độ</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.title}</td>
                    <td>{e.category}</td>
                    <td>{e.is_publish === "1" ? "public " : "private"}</td>
                    <td>{e.created_at}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setShowEdit(true);
                          setInfoPost({
                            ...e,
                            is_publish: e.is_publish === "0" ? false : true,
                          });
                        }}
                        className="mr-2"
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDelete(true);
                          setCurrItem(e);
                        }}
                        className="btn-danger mr-2"
                      >
                        Xóa
                      </Button>
                      <Button
                        onClick={() => previewPost(e.id)}
                        className="btn-danger"
                        className="mr-2"
                      >
                        Xem
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {totalPost ? (
          <Pagination
            threeDots
            totalPages={totalPost}
            currentPage={currPage}
            showMax={totalPost > 5 ? 4 : totalPost}
            prevNext
            activeBgColor="#18eaca"
            activeBorderColor="#7bc9c9"
            onClick={(page) => {
              setCurrentPage(page);
              getPostList(page);
            }}
          />
        ) : null}
      </div>

      {/* edit */}
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setInfoPost(initInfoPost);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
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
            <Form.Group controlId="formBasicTitleImages">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Danh sách url của hình ảnh nằm trên các dòng khác nhau"
                value={infoPost.image ? imageArrayToString(infoPost.image) : ""}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, images: v.target.value })
                }
              />
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
                  {category.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.title}
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
            <Form.Group controlId="formBasicContent">
              <Form.Label>Nội dung</Form.Label>
              <Editor
                //   onEditorChange={onDescriptionChangeHandler}
                apiKey="0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2"
                //   initialValue={creature.description.replaceAll("<br />", "")}
                init={{
                  body_id: "my_edit",
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
      </Modal>

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => {
          setInfoPost(initInfoPost);
          setShowCreate(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo bài viết</Modal.Title>
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
            <Form.Group controlId="formBasicTitleImages">
              <Form.Label>Hình ảnh</Form.Label>
              <Button
                className="mr-2"
                variant="primary"
                onClick={getListImages}
              >
                Thêm ảnh
              </Button>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Danh sách url của hình ảnh nằm trên các dòng khác nhau"
                value={infoPost.images}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, images: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                as="select"
                onChange={(v) =>
                  setInfoPost({ ...infoPost, category: v.target.value })
                }
                defaultValue={category[0].id}
              >
                {category.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </Form.Control>
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
            <Form.Group controlId="formBasicContent">
              <Form.Label>Nội dung</Form.Label>
              <Editor
                //   onEditorChange={onDescriptionChangeHandler}
                apiKey="0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2"
                //   initialValue={creature.description.replaceAll("<br />", "")}
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
                }}
                value={infoPost.content}
                onEditorChange={(value) =>
                  setInfoPost({ ...infoPost, content: value })
                }
              />
            </Form.Group>
          </Form>
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
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Miêu tả:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem ? currItem.description : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 font-weight-bold">Danh mục:</div>
            <div className="p-2 flex-sm-grow-1">
              {currItem
                ? "(" + currItem.category + ") " + currItem.categoryTitle
                : ""}
            </div>
          </div>
          <div>
            <div className="p-2 font-weight-bold">Ảnh:</div>
            <div className="p-2 d-flex flex-wrap">
              {currItem && currItem.images && currItem.images.length > 0
                ? currItem.images.map((e) => (
                    <div class="d-flex flex-wrap p-2">
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

      <Modal
        show={showImage}
        onHide={() => setShowImage(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chọn ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                listImages.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td><Form.Check type="checkbox" label="Check me out" onChange={(v) => addImgae(v, e)}/></td>
                      <td>
                        <img src={e.url} alt="error" style={{width: '100px'}}/>
                      </td>
                      <td>{e.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImage(false)}>
            Đóng
          </Button>
          <Button variant="secondary" onClick={() => setShowImage(false)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
