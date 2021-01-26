import React, { useEffect, useState } from "react";
import "./Post.css";
// import TableAdminvV1 from "../../../components/UI/TableAdminvV1/TableAdminvV1";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Modal, Button, Table } from 'react-bootstrap';
// import Modal from "../../../components/UI/Modal/Modal";
// import PostUpdate from "./PostDetail/PostDetail";
// import DeleteForm from "../../../components/DeleteForm/DeleteForm";

// const TABLE_CONFIG = {
//   id: "id",
//   title: "Title",
//   author: "Author",
//   category: "CategoryId",
//   created_by: "OwnerId",
//   created_at: "Created Day",
//   updated_at: "Last Update",
// };

const Post = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [showModal, setShowModal] = useState(false);
    // const [editPost, setEditPost] = useState(null);
    // const [isDelete, setIsDelete] = useState(false);
    // const [postDelete, setPostDelete] = useState(null);
    // const [searchKey, setSearchKey] = useState(null);

    // const {onFetchPost} = props;
    // const changeSearchKeyHandler = (key) => {
    //   console.log(key);
    //   setSearchKey(key);
    // }

    // useEffect(() => {
    //   if(searchKey) {
    //     onFetchPost({ categories: "", limit: 10, page: currentPage, title: searchKey});
    //   } else {
    //     onFetchPost({ categories: "", limit: 10, page: currentPage });
    //   }

    // }, [searchKey, currentPage, onFetchPost]);

    // const onChangeCurrentPage = (page) => {
    //   setCurrentPage(page);  
    // }

    // const onViewDetailHandler = (item) => {
    //   const link = window.location.origin + "/bai-viet/" + item.id;
    //   window.open(link, "_blank");
    // };

    // const editHandler = (item) => {
    //   setShowModal(true);
    //   setEditPost(item);
    // };

    // const onCloseModal = () => {
    //   setEditPost(null);
    //   setShowModal(false);
    //   props.onPostEndForm();
    //   setIsDelete(false);
    //   setPostDelete(null);
    // };

    // const createNewPost = () => {
    //   setShowModal(true);
    // };

    // const deletePost = (item) => {
    //   setIsDelete(true);
    //   setPostDelete(item);
    // };

    // const cancleDelete = () => {
    //   setIsDelete(false);
    //   setPostDelete(null);
    // };

    // const confimDeletePost = () => {
    //   if (postDelete) {
    //     props.onDeletePost(postDelete.id, props.token);
    //   }
    // };

    return (
        <div>
            <div className="container-fluid pt-5 pb-5">
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
                        {/* render by loop */}
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <Button onClick={handleShow} className='mr-2'>Sửa</Button>
                                <Button className='btn-danger'>Xóa</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            {/* <Modal show={showModal} modalClosed={onCloseModal}>
        <PostUpdate editPost={editPost} formClosed={onCloseModal} />
      </Modal>
      <Modal show={isDelete} modalClosed={onCloseModal}>
        <DeleteForm
          title={postDelete ? postDelete.title : ""}
          cancleDelete={cancleDelete}
          confimDelete={confimDeletePost}
          deleteSuccess={props.formSubmit}
        />
      </Modal>

      <TableAdminvV1
        tableConfig={TABLE_CONFIG}
        data={props.posts}
        onViewDetail={onViewDetailHandler}
        onEdit={editHandler}
        createClick={createNewPost}
        deleteClick={deletePost}
        fetchData={onChangeCurrentPage}
        total={props.totalPost}
        onSearchData={changeSearchKeyHandler}
      /> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        token: state.auth.token,
        formSubmit: state.posts.formSubmit,
        totalPost: state.posts.total
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPost: (payload) => dispatch(actions.fetchPost(payload)),
        onPostEndForm: () => dispatch(actions.postEndForm()),
        onDeletePost: (id, token) => dispatch(actions.deletePost(id, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
