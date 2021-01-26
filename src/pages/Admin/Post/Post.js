import React, { useEffect, useState } from "react";
import "./Post.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from './../../../store/utilities/apiConfig';
import * as actionTypes from './../../../store/actions/actionTypes';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        posts: state.posts,
        // formSubmit: state.posts.formSubmit,
        // totalPost: state.posts.total
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onFetchPost: (payload) => dispatch(actions.fetchPost(payload)),
        // onPostEndForm: () => dispatch(actions.postEndForm()),
        // onDeletePost: (id, token) => dispatch(actions.deletePost(id, token)),
        setLoader: (payload) => dispatch({
            type: actionTypes.SET_LOADER, payload
        }),
        setPosts: (payload) => dispatch({
            type: actionTypes.SET_POSTS_LIST, payload
        })
    };
};

const Post = (props) => {
    const {
        auth,
        posts,
        setLoader,
        setPosts
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [infoPost, setInfoPost] = useState({
        id: null,
        title: '',
        created_at: ''
    })

    const [titleCreate, setTitleCreate] = useState('');

    useEffect(() => {
        if (!posts) getPostList();
    }, [])

    const getPostList = () => {
        setLoader(true);
        axios({
            method: 'get',
            url: baseUrl + 'auth/posts',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            params: {
                page: 1,
                limit: 10,
                is_publish: 'true'
            }
        })
            .then(res => {
                console.log(res);
                setLoader(false);
                setPosts(res.data.data.posts);
            })
    }


    const openEdit = (item) => {
        setInfoPost({
            id: item.id,
            title: item.title,
            created_at: item.created_at
        })
        setShowEdit(true);
    }

    const openDelete = (item) => {
        setInfoPost({
            id: item.id,
            title: item.title,
            created_at: item.created_at
        })
        setShowDelete(true);
    }

    const editHandle = () => {
        setLoader(true);
        axios({
            method: 'put',
            url: baseUrl + 'auth/categories/' + infoPost.id,
            data: {
                title: infoPost.title
            },
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
            .then(() => {
                setShowEdit(false);
                getPostList();
            })
    }

    const deleteHandle = () => {
        setLoader(true);
        axios({
            method: 'delete',
            url: baseUrl + 'auth/categories/' + infoPost.id,
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
            .then((res) => {
                console.log('delete handle result:', res);
                setShowDelete(false);
                getPostList();
            })
    }

    const saveHandle = () => {
        setLoader(true);
        axios({
            method: 'post',
            url: baseUrl + 'auth/categories',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            },
            data: {
                title: titleCreate
            }
        })
            .then(() => {
                setShowCreate(false);
                getPostList();
            })
    }

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
                        {
                            posts && posts.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.title}</td>
                                        <td>Otto</td>
                                        <td>
                                            <Button onClick={() => setShowEdit(true)} className='mr-2'>Sửa</Button>
                                            <Button onClick={() => setShowDelete(true)} className='btn-danger'>Xóa</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
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
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Nhập tên danh mục"
                                value={infoPost.title}
                                onChange={(v) => setInfoPost({ ...infoPost, title: v.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>Đóng</Button>
                    <Button variant="primary" onClick={editHandle}>Lưu</Button>
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
                    <Modal.Title>Tạo danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Nhập tên danh mục"
                                value={titleCreate}
                                onChange={(v) => setTitleCreate(v.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreate(false)}>Đóng</Button>
                    <Button variant="primary" onClick={saveHandle}>Lưu</Button>
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
                    {'Bạn có chắc muốn xóa "' + infoPost.title + '" ?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>Hủy</Button>
                    <Button variant="danger" onClick={deleteHandle}>Có</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
