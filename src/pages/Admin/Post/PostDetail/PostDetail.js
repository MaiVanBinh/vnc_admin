import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import FormCreateUpdate from "../../../../components/FormCreateUpdate/FormCreateUpdate";

const PostDetail = (props) => {
  const [formInput, setFormInput] = useState({
    title: {
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
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    content: {
      value: null,
      isValid: true,
      validMessage: "Don't allow empty string",
    },
    category: null,
  });

  useEffect(() => {
    if (props.editPost) {
      props.onFetchPost(props.editPost.id);
    }
    props.onFetchAuthor();
    props.onFetchCategory();
  }, []);
  useEffect(() => {
    if (props.editPost) {
      setFormInput({
        title: props.editPost.title,
        author: props.editPost.author ? props.editPost.author : "",
        description: props.editPost.description,
        content: props.editPost.content,
        category: props.editPost.category,
      });
    } else {
      setFormInput({
        title: "",
        author: "",
        description: "",
        content: "",
        category: 1,
      });
    }
  }, [props.editPost]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onContentChange = (content) => {
    setFormInput((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.editPost) {
      props.onUpdatePost(
        {
          id: props.editPost.id,
          title: formInput.title,
          author: formInput.author,
          description: formInput.description,
          content: formInput.content,
          category: formInput.category,
        },
        props.token
      );
    } else {
      props.onCreatePost(
        {
          title: formInput.title,
          author: formInput.author,
          description: formInput.description,
          content: formInput.content,
          category: formInput.category,
        },
        props.token
      );
    }
  };
  return (
    <FormCreateUpdate titleForm={props.editPost ? 'Edit' : 'Create'} onCloseHandler={props.formClosed}>
      {props.formSubmit ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <i
            class="far fa-check-circle"
            style={{ fontSize: 30, color: "#3B568D" }}
          ></i>
          <h2>Success</h2>
        </div>
      ) : (
        <form onSubmit={onSubmitHandler} className="admin-post">
          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Title</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="title.."
                value={formInput.title}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="author">Author:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="title"
                name="author"
                placeholder="Author.."
                value={formInput.author}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="category">Category</label>
            </div>
            <div className="col-75">
              <select
                id="category"
                name="category"
                value={formInput.category}
                onChange={onChangeHandler}
              >
                {props.categories
                  ? props.categories.map((item) => (
                      <option value={item.id}>{item.name_vn}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-75">
              <textarea
                id="description"
                name="description"
                placeholder="Write something.."
                style={{ height: "200px" }}
                value={formInput.description}
                onChange={onChangeHandler}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="content">Content</label>
            </div>
            <div className="col-75">
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
                value={formInput.content}
                onEditorChange={onContentChange}
              />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </FormCreateUpdate>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    currentPost: state.posts.currentPost,
    authors: state.author.authors,
    categories: state.category.category,
    token: state.auth.token,
    formSubmit: state.posts.formSubmit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (id) => dispatch(actions.fetchPostDetail(id)),
    onFetchAuthor: () => dispatch(actions.fetchAuthors(null, "all")),
    onFetchCategory: () => dispatch(actions.fetchCategory()),
    onUpdatePost: (payload, token) =>
      dispatch(actions.updatePost(payload, token)),
    onCreatePost: (payload, token) =>
      dispatch(actions.createPost(payload, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
