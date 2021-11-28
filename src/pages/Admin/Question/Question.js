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
  getIndexListPage,
} from "../../../store/utilities/common";
import { apiKeyEditor } from "../../../constant";
import {
  IconPlus,
  IconRefresh,
  IconSearch,
  IconCheck,
  IconMultiply,
  IconView,
  IconEdit,
  IconGarbage2,
} from "../../../store/utilities/SVG";
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

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [imageSearch, setImageSearch] = useState({
    name: "",
  });

  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState({
    active: false,
    callback: null,
  });

  const [initInfoQuestion, setInitInfoQuestion] = useState({
    id: null,
    title: "",
    description: "",
    is_publish: 1,
  });

  const [answers, setAnswers] = useState(null)
  const [displayAnswers, setDisplayAnswers] = useState(null)
  const [totalAnswers, setTotalAnswers] = useState(0)
  const [filterMode, setFilterMode] = useState(-1)
  const [questions, setQuestions] = useState(null)

  const [infoQuestion, setInfoQuestion] = useState({
    id: null,
    title: "",
    description: "",
    is_publish: 1,
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

  const imagesHandler = (item) => {
    const newImages = [...images, item];
    setImages(newImages);
    showImage.callback(item.url, { title: item.name });
    setShowImage({
      active: false,
      callback: null,
    });
  };

  useEffect(() => {
    getQuestionList();
  }, [auth.token, filterList, setLoader, setQuestions]);

  useEffect(() => {
    getListImages();
  }, [filterImageList, getListImages]);


  const censorshipQuestion = async (questionId) => {
    const res = await axios({
      method: 'put',
      url: baseUrl + `auth/question/censorship/${questionId}`,
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
      url: baseUrl + `auth/question/${currItem.id}`,
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
      url: baseUrl + `auth/answer/${answerId}`,
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
      url: baseUrl + `auth/answer/${answerId}`,
      headers: {
        Authorization: "Bearer " + auth.token,
        'Content-Type': 'application/json'
      }
    })
    const newAnswer = await getAnswerByQuestionId(questionId)
    setAnswers(newAnswer)
  }

  useEffect(() => {
    setFilterKindAnswer(filterMode, answers)
  }, [setFilterMode, setAnswers, answers])

  const previewQuestion = async (id) => {
    const answer = await getAnswerByQuestionId(id)
    setAnswers(answer)
    setDisplayAnswers(answer)
    setTotalAnswers(answer.answers.length)
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

  const setFilterKindAnswer = (value, answers) => {
    if(answers) {
      setFilterMode(value)
      if(value == -1) {
        setDisplayAnswers(answers)
        setTotalAnswers(answers.answers.length)
      } else {
        const filter = answers.answers.filter(ans => ans.is_publish == value)
        const total = filter.length
        const newAnswer = {
          pages: answers.pages,
          answers: filter
        }
        setTotalAnswers(total)
        setDisplayAnswers(newAnswer)
      }
    }
  }

  const closeShowPreview = () => {
    setShowPreview(false)
  }

  const changePageImageList = (page) => {
    setFilterImageList({
      ...filterImageList,
      page,
    });
  };

  const createQuestion = () => {
    const is_publish = infoQuestion.is_publish == "1" ? 1 : 0;
    setLoader(true);
    axios({
      method: "post",
      url: baseUrl + "question",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: {
        ...infoQuestion,
        is_publish: is_publish
      },
    })
    .then((res) => {
      setShowCreate(false);
      getQuestionList();
      setLoader(false);
      setInfoQuestion(initInfoQuestion);
    })
    .catch((err) => {
      setLoader(false);
    });
  }

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

      {/* create */}
      <Modal
        show={showCreate}
        onHide={() => {
          setInfoQuestion(initInfoQuestion);
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
                type="title"
                placeholder="Nhập tên danh mục"
                value={infoQuestion.title}
                onChange={(v) => {
                  setInfoQuestion({ ...infoQuestion, title: v.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicMode">
              <Form.Label>Chế độ</Form.Label>
              <Form.Control
                as="select"
                defaultValue={1}
                onChange={(v) =>
                  setInfoQuestion({ ...infoQuestion, is_publish: v.target.value })
                }
              >
                <option value={1}>Public</option>
                <option value={0}>Private</option>
              </Form.Control>
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
                value={infoQuestion.description}
                onEditorChange={(value) =>
                  setInfoQuestion({ ...infoQuestion, description: value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setInfoQuestion(initInfoQuestion);
              setShowCreate(false);
            }}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={createQuestion}>
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
        // onHide={() => setShowPreview(false)}
        onHide={() => closeShowPreview}
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
            <div className="filter-answer">
              <Form>
                <Form.Group className="mode-form" controlId="formBasicMode">
                  <Form.Label className="label-answer">Chế độ :</Form.Label>
                  <Form.Control
                    className="form-control-answer"
                    as="select"
                    defaultValue={filterMode}
                    onChange={(v) =>
                      setFilterKindAnswer(v.target.value, answers)
                    }
                  >
                    <option value={-1}>Tất cả</option>
                    <option value={1}>Public</option>
                    <option value={0}>Private</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <span className="answer-number">Số lượng : {totalAnswers}</span>
            </div>
            {displayAnswers && displayAnswers.answers ? (
              displayAnswers.answers.map((ans, i) => {
                return (
                  <div key={i} className="answer">
                    <div className="answer-description"
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
                          <div className="done">
                            <span>Đã duyệt</span>
                          </div>
                        </div>

                        )}
                  </div>
                );
              })
            ) : null}
            <div className="pagination mt-4 d-flex justify-content-center">
              {displayAnswers ? (
                <Pagination pagination={displayAnswers.pages} callFetchList={changeAnswerPage} />
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

      <Modal
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
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
