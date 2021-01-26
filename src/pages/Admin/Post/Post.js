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


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    category: state.category,
    // formSubmit: state.posts.formSubmit,
    // totalPost: state.posts.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onFetchPost: (payload) => dispatch(actions.fetchPost(payload)),
    // onPostEndForm: () => dispatch(actions.postEndForm()),
    // onDeletePost: (id, token) => dispatch(actions.deletePost(id, token)),
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
  };
};

const Post = (props) => {
  const { auth, posts, setLoader, setPosts, category, setCategory } = props;

  const [showFilter, setShowFilter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [currPage, setCurrentPage] = useState(1);
  const [infoPost, setInfoPost] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    category: null,
    description: "",
    is_publish: false,
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
    setLoader(true);
    axios({
      method: "put",
      url: baseUrl + "auth/posts/" + infoPost.id,
      data: {
        ...infoPost,
        images: imagesUpdate,
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
        alert("Em khoong biet lay loi sao");
        setLoader(false);
      });
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
      },
    })
      .then((res) => {
        setShowCreate(false);
        getPostList();
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
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
          <Button
            className="mr-2"
            onClick={() => {
              setShowFilter(true);
            }}
          >
            Filter
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
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
                    <td>{e.created_at}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setShowEdit(true);
                          setInfoPost(e);
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
                        className="btn-danger"
                      >
                        Xóa
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
              <Form.Label>Tên tiêu đề</Form.Label>
              <Form.Control
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoPost.title}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, title: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitleDescription">
              <Form.Label>Miêu tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Nhập miêu tả"
                value={infoPost.description}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, description: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitleImages">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Nhập miêu tả"
                value={infoPost.images}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, images: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Phân loại</Form.Label>
              {category ? (
                <Form.Control
                  as="select"
                  onChange={(v) =>
                    setInfoPost({ ...infoPost, category: v.target.value })
                  }
                  defaultValue={infoPost.category}
                >
                  {category.map((e) => (
                    <option value={e.id}>{e.title}</option>
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
          <Modal.Title>Tạo bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên tiêu đề</Form.Label>
              <Form.Control
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoPost.title}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, title: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitleDescription">
              <Form.Label>Miêu tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Nhập miêu tả"
                value={infoPost.description}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, description: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitleImages">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="title"
                placeholder="Nhập miêu tả"
                value={infoPost.images}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, images: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Phân loại</Form.Label>
              <Form.Control
                as="select"
                onChange={(v) =>
                  setInfoPost({ ...infoPost, category: v.target.value })
                }
                defaultValue={category[0].id}
              >
                {category.map((e) => (
                  <option value={e.id}>{e.title}</option>
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

      {/* Filter Form */}
      <Modal
        show={showFilter}
        onHide={() => setShowFilter(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lọc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên tiêu đề</Form.Label>
              <Form.Control
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoPost.title}
                onChange={(v) =>
                  setInfoPost({ ...infoPost, title: v.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Phân loại</Form.Label>
              {category
                ? category.map((e) => (
                    <Form.Check type="checkbox" label={e.title} value={e.id} onChange={(e) => console.log(e.target.checked)}/>
                  ))
                : null}
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
                <option value={true}>All</option>
                <option value={true}>Public</option>
                <option value={false}>Private</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicMode">
              <Form.Label>Ngày tạo</Form.Label>
              
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
