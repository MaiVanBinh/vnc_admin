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
    listImages: state.listImages,
    questions: state.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setListImages: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_IMAGES,
        payload,
      }),
  };
};

const Question = (props) => {
  const {
    auth,
    setLoader,
    setListImages,
    listImages,
  } = props;

  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [showImage, setShowImage] = useState({
    active: false,
    callback: null,
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

  const [answers, setAnswers] = useState(null)
  const [questions, setQuestions] = useState(null)

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
    page: 1,
    limit: 10,
  });

  const [filterAnswerList, setFilterAnswerList] = useState({
    page: 1,
    limit: 50,
  });
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterImageList, setFilterImageList] = useState({
    name: "",
    page: 1,
    limit: 10,
  });

  const getQuestionList = async () => {
    setLoader(true);
    const res = await axios({
      method: "get",
      url: baseUrl + "question",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterList,
    })
    setLoader(false);

    const { begin, end } = getIndexListPage(
      filterList.page,
      filterList.limit,
      res.data.data.total
    );

    res.data.data.pages.begin = begin;
    res.data.data.pages.end = end;

    await res.data.data.questions.forEach(async question => {
      const newAnswer = await fetchTotalAnswer(question.id)
      question.ans = newAnswer
    })

    setQuestions(res.data.data);
  }

  const getAnswerByQuestionId = async (questionId) => {
    const res = await axios({
      method: "get",
      url: baseUrl + "answer/" + questionId,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterAnswerList,
    })

    const { begin, end } = getIndexListPage(
      filterAnswerList.page,
      filterAnswerList.limit,
      res.data.data.total
    );

    res.data.data.pages.begin = begin;
    res.data.data.pages.end = end;
  
    setAnswers(res.data.data)
    return res.data.data
  }

  const fetchTotalAnswer = async (questionId) => {
    const filterList = {
      is_publish: 0
    }
    const res = await axios({
      method: "get",
      url: baseUrl + "answer/total/" + questionId,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      params: filterList,
    })
    return res.data.data[0].total
  }

  useEffect(() => {
    getQuestionList();
  }, [auth.token, filterList, setLoader, setQuestions]);

  // const getListImages = useCallback(() => {
  //   setLoader(true);
  //   axios({
  //     method: "get",
  //     url: baseUrl + "auth/assets",
  //     headers: {
  //       Authorization: "Bearer " + auth.token,
  //     },
  //     params: filterImageList,
  //   }).then((res) => {
  //     const { begin, end } = getIndexListPage(
  //       filterImageList.page,
  //       filterImageList.limit,
  //       res.data.data.total
  //     );
  //     res.data.data.pages.begin = begin;
  //     res.data.data.pages.end = end;

  //     setListImages(res.data.data);
  //     setLoader(false);
  //   });
  // }, [auth.token, filterImageList, setListImages, setLoader]);

  const censorshipQuestion = async (questionId) => {
    const res = await axios({
      method: 'put',
      url: `http://localhost:8080/vnback/auth/question/censorship/${questionId}`,
      headers: {
        Authorization: "Bearer " + auth.token,
        'Content-Type': 'application/json'
      }
    })
    await getQuestionList(questionId)
  }

  const deleteQuestion = async () => {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8080/vnback/auth/question/${currItem.id}`,
      headers: {
        Authorization: "Bearer " + auth.token,
        'Content-Type': 'application/json'
      }
    })
    await getQuestionList(currItem.id)
    setShowDelete(false);
  }


  const updateAnswer = async (questionId, answerId) => {
    const res = await axios({
      method: 'put',
      url: `http://localhost:8080/vnback/auth/answer/${answerId}`,
      headers: {
        Authorization: "Bearer " + auth.token,
        'Content-Type': 'application/json'
      }
    })
    const newAnswer = await getAnswerByQuestionId(questionId)
    setAnswers(newAnswer)
  }

  const deleteAnswer = async (questionId, answerId) => {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8080/vnback/auth/answer/${answerId}`,
      headers: {
        Authorization: "Bearer " + auth.token,
        'Content-Type': 'application/json'
      }
    })
    const newAnswer = await getAnswerByQuestionId(questionId)
    setAnswers(newAnswer)
  }

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

  const previewQuestion = async (id) => {
    const answer = await getAnswerByQuestionId(id)
    setAnswers(answer)
    setLoader(true);
    const res = await axios({
      method: "get",
      url: baseUrl + "auth/question/" + id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
    setCurrItem(res.data.data[0])
    setLoader(false)
    setShowPreview(true)
  };

  const changePage = (page) => {
    setFilterList({
      ...filterList,
      page,
    });
  };

  const changeAnswerPage = (page) => {
    setFilterAnswerList({
      ...filterAnswerList,
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
              }}
            >
              <IconPlus width={15} height={15} color={"#fff"} />
            </Button>
            <Button
              className="mr-2"
              onClick={() => {
                setSearchKeyword("");
                setFilterList({
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
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="d-flex justify-content-center align-item-center">
                #
              </th>
              <th>Tiêu đề</th>
              <th>
                Công khai
              </th>
              <th className="d-flex justify-content-center align-item-center">
                Comment mới
              </th>
              <th>Ngày tạo</th>
              <th className="d-flex justify-content-center align-item-center">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {questions && questions.questions ? (
              questions.questions.map((e, i) => {
                let beginIndex = questions.pages.begin;
                return (
                  <tr key={i}>
                    <td className="d-flex justify-content-center align-item-center">
                      {beginIndex + i}
                    </td>
                    <td>{e.title}</td>
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
                    <td>{e.ans}</td>
                    <td>{e.created_at}</td>
                    <td className="d-flex justify-content-around align-item-center">
                      <div
                        className="icon d-flex align-items-center"
                        onClick={() => previewQuestion(e.id)}
                      >
                        <IconView color={"#333333"} width={15} height={15} />
                      </div>
                      <div
                        className="icon d-flex align-items-center"
                        onClick={() => censorshipQuestion(e.id)}
                        // onClick={() => {
                        //   setShowEdit(true);
                        //   setInfoPost({
                        //     ...e,
                        //     is_publish: e.is_publish === "0" ? false : true,
                        //   });
                        //   setImages(e.image);
                        //   setOldImages(e.image);
                        // }}
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
                    {questions}
                    Không có kết quả nào được tìm thấy
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="pagination mt-4 d-flex justify-content-center">
          {questions ? (
            <Pagination pagination={questions.pages} callFetchList={changePage} />
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
          <Button variant="primary">
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
          <Modal.Title>Xóa câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currItem ? 'Bạn có chắc muốn xóa "' + currItem.title + '" ?' : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={deleteQuestion}>
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
                __html: currItem ? currItem.description : "",
              }}
            ></div>
          </div>
          <div className="answer-total">
            {answers && answers.answers ? (
              answers.answers.map((ans, i) => {
                return (
                  <div className="answer">
                    <div key={i} className="answer-description"
                    dangerouslySetInnerHTML={{
                      __html: ans ? ans.description : "",
                    }}>
                    </div>
                    <div className="date-time">
                      Ngày đăng: <span className="date">{ans.created_at}</span>
                    </div>
                    { ans.is_publish == 0 ? (
                      <div>
                        <Button variant="success" className="agree" onClick={() => updateAnswer(ans.question_id, ans.id)}>
                          Duyệt
                        </Button>
                        <Button variant="danger" className="delete" onClick={() => deleteAnswer(ans.question_id, ans.id)}>
                          Xóa
                        </Button>
                      </div>
                      ) : (
                        <div>
                          <Button variant="danger" className="delete" onClick={() => deleteAnswer(ans.question_id, ans.id)}>
                            Xóa
                          </Button>
                          <div class="done">
                            <span>Đã duyệt</span>
                          </div>
                        </div>

                        )}
                  </div>
                );
              })
            ) : null}
            <div className="pagination mt-4 d-flex justify-content-center">
              {answers ? (
                <Pagination pagination={answers.pages} callFetchList={changeAnswerPage} />
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Đóng
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);
