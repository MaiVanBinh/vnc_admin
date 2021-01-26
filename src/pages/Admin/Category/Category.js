import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from './../../../store/utilities/apiConfig';
import * as actionTypes from './../../../store/actions/actionTypes';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        category: state.category
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (payload) => dispatch({
            type: actionTypes.SET_CATEGORY_LIST, payload
        }),
        setLoader: (payload) => dispatch({
            type: actionTypes.SET_LOADER, payload
        })
    }
}

const Category = (props) => {
    const {
        auth,
        category,
        setCategory,
        setLoader
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [infoCategory, setInfoCategory] = useState({
        id: null,
        title: '',
        created_at: ''
    })

    const [titleCreate, setTitleCreate] = useState('');

    useEffect(() => {
        if (!category) {
            getCategoryList();
        }
    }, [])

    const getCategoryList = () => {
        setLoader(true);
        axios({
            method: 'get',
            url: baseUrl + 'categories',
            params: {
                page: 1,
                limit: 10
            }
        })
            .then(res => {
                setCategory(res.data.data.category);
                setLoader(false);
            })
    }

    const openEdit = (item) => {
        setInfoCategory({
            id: item.id,
            title: item.title,
            created_at: item.created_at
        })
        setShowEdit(true);
    }

    const openDelete = (item) => {
        setInfoCategory({
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
            url: baseUrl + 'auth/categories/' + infoCategory.id,
            data: {
                title: infoCategory.title
            },
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
        .then(() => {
            setShowEdit(false);
            getCategoryList();
        })
    }

    const deleteHandle = () => {
        setLoader(true);
        axios({
            method: 'delete',
            url: baseUrl + 'auth/categories/' + infoCategory.id,
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
        .then((res) => {
            console.log('delete handle result:', res);
            setShowDelete(false);
            getCategoryList();
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
            getCategoryList();
        })
    }

    return (
        <div>
            <div className="container-fluid pt-5 pb-5">
                <div className="wrap-action mb-3">
                    <Button className='mr-2' onClick={() => setShowCreate(true)}>Tạo danh mục +</Button>
                    <Button onClick={() => getCategoryList()}>Tải lại danh sách</Button>
                </div>
                
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
                            category && category.map((e, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.title}</td>
                                    <td>{e.created_at}</td>
                                    <td>
                                        <Button onClick={() => openEdit(e)} className='mr-2'>Sửa</Button>
                                        <Button onClick={() => openDelete(e)} className='btn-danger'>Xóa</Button>
                                    </td>
                                </tr>
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
                                value={infoCategory.title} 
                                onChange={(v) => setInfoCategory({...infoCategory, title: v.target.value})} 
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
                    {'Bạn có chắc muốn xóa "' + infoCategory.title + '" ?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>Hủy</Button>
                    <Button variant="danger" onClick={deleteHandle}>Có</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);