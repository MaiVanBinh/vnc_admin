import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from "./../../../store/actions/actionTypes";
import { getIndexListPage, validateLengthSpace } from './../../../store/utilities/common';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from './../../../store/utilities/apiConfig';
import Pagination from './../../../components/Panigation/Pagination';
import { 
    IconRefresh
  } from './../../../store/utilities/SVG';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        listUsers: state.listUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (payload) => dispatch({
            type: actionTypes.SET_LOADER, payload
        }),
        setlistUsers: (payload) => dispatch({
            type: actionTypes.SET_LIST_USERS, payload
        })
    }
}

const User = (props) => {
    const {
        auth,
        listUsers,
        setlistUsers,
        setLoader
    } = props;

    const [filterList, setFilterList] = useState({
        username: '',
        page: 1,
        limit: 10,
    })
    const [info, setInfo] = useState({})
    const [validInfo, setValidInfo] = useState({
        password: '',
        rePassword: '',
    })
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        getListUsers();
    }, [filterList])

    const getListUsers = () => {
        setLoader(true);
        axios({
            method: 'get',
            url: baseUrl + 'auth/users',
            headers: {
                Authorization: "Bearer " + auth.token,
            },
            params: filterList
        })
            .then(res => {
                const { begin, end } = getIndexListPage(filterList.page, filterList.limit, res.data.data.total);
                res.data.data.pages.begin = begin;
                res.data.data.pages.end = end;
                setlistUsers(res.data.data);
                setLoader(false);
            })
    }

    const changePage = (page) => {
        setFilterList({
            ...filterList, page
        })
    }

    const openEdit = (item) => {
        item.password = '';
        item.rePassword = '';
        setInfo(item);
        setShowEdit(true);
    }

    const openDelete = (item) => {
        setInfo(item);
        setShowDelete(true);
    }

    const deleteHandle = () => {
        axios({
            method: "delete",
            url: baseUrl + "auth/users/" + info.id,
            headers: {
                Authorization: "Bearer " + auth.token,
            },
        })
            .then(res => {
                if(res.status === 200) {
                    // setInformSuccess(true);
                    setShowEdit(false);
                }
                else{
                    alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                }
                setLoader(false);
                setShowDelete(false);
            })
            .catch(function() {
                alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                setLoader(false);
            })
    }

    const saveHandle = () => {
        let checkPassword = false, checkRePassword = false;
        if (validateLengthSpace(info.password, 8, 16) === 'incorrect') {
            checkPassword = 'Mật khẩu phải từ 8 tới 16 ký tự.';
        }
        if(info.rePassword !== info.password) {
            checkRePassword = 'Xác nhận mật khẩu không trùng với mật khẩu.';
        }

        // console.log(checkPassword, checkRePassword);

        if(checkPassword || checkRePassword){
            setValidInfo({
                password: checkPassword,
                rePassword: checkRePassword,
            })
            return;
        }
        else {
            setValidInfo({
                password: '',
                rePassword: '',
            })
            setLoader(true);
            axios({
                method: "post",
                url: baseUrl + "auth/users/change-password-sadmin",
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
                data: {
                    userId: info.id,
                    password: info.password
                },
            })
                .then(res => {
                    if(res.status === 201) {
                        // setInformSuccess(true);
                        setShowEdit(false);
                    }
                    else{
                        alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                    }
                    setLoader(false);
                })
                .catch(function() {
                    alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                    setLoader(false);
                })
        }
    }

    return <div className='container-fluid pt-3 pb-5'>
        <div className="wrap-action mb-3">
            <Button onClick={() => setFilterList({
                username: '',
                page: 1,
                limit: 10,
            })}><IconRefresh width={15} height={15} color={'#fff'} /></Button>
        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Trạng thái</th>
                    <th>Chức năng</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody className='list-images'>
                {
                    listUsers && listUsers.users.length === 0 ?
                        <tr>
                            <td colSpan="6" className='text-center'>Không có kết quả nào được tìm thấy</td>
                        </tr>
                        : null
                }
                {
                    listUsers && listUsers.users.length > 0 ? listUsers.users.map((e, i) => {
                        let beginIndex = listUsers.pages.begin;
                        return <tr key={i}>
                            <td>{beginIndex + i}</td>
                            <td>{e.username}</td>
                            <td>{e.state === '0' ? 'Inactive' : 'Active'}</td>
                            <td>{e.role === '0' ? 'Admin' : e.role === '1' ? 'Super admin' : 'unknow'}</td>
                            <td>{e.created_at}</td>
                            <td>
                                <Button className='mr-2' onClick={() => openEdit(e)}>Sửa</Button>
                                {e.role !== '1' ? <Button onClick={() => openDelete(e)} className='btn-danger'>Xóa</Button> : null}
                            </td>
                        </tr>
                    })
                        : null
                }
            </tbody>
        </Table>

        <div className="pagination mt-4 d-flex justify-content-center">
            {
                listUsers ? <Pagination pagination={listUsers.pages} callFetchList={changePage} /> : null
            }
        </div>

        {/* edit */}
        <Modal
            show={showEdit}
            onHide={() => setShowEdit(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Sửa thông tin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mật khẩu mới:</Form.Label>
                        <Form.Control type="password"
                            value={info.password}
                            onChange={(v) => setInfo({ ...info, password: v.target.value })}
                            placeholder="Mật khẩu"
                            isInvalid={validInfo.password.length > 0}
                        />
                        {
                            validInfo.password.length > 0 ?
                                <Form.Control.Feedback type="invalid">
                                    {validInfo.password}
                                </Form.Control.Feedback>
                                : null
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Nhập lại mật khẩu:</Form.Label>
                        <Form.Control type="password"
                            value={info.rePassword}
                            onChange={(v) => setInfo({ ...info, rePassword: v.target.value })}
                            placeholder="Xác nhận mật khẩu"
                            isInvalid={validInfo.rePassword.length > 0}
                        />
                        {
                            validInfo.rePassword.length > 0 ?
                                <Form.Control.Feedback type="invalid">
                                    {validInfo.rePassword}
                                </Form.Control.Feedback>
                                : null
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEdit(false)}>
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
                <Modal.Title>Xóa người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {'Bạn có chắc muốn xóa "' + info.username + '" ?'}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDelete(false)}>Hủy</Button>
                <Button variant="danger" onClick={deleteHandle}>Có</Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);