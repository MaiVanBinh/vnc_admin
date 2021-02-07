import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Badge, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { validateLengthSpace } from './../../../store/utilities/common';
import { baseUrl } from "./../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../store/actions/actionTypes";

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (payload) => dispatch({
            type: actionTypes.SET_LOADER, payload
        }),
        logout: () => dispatch({
            type: actionTypes.LOG_OUT
        })
    }
}

const Profile = (props) => {
    const {
        auth,
        setLoader,
        logout
    } = props;

    const [info, setInfo] = useState({
        password: '',
        rePassword: ''
    })
    const [validInfo, setValidInfo] = useState({
        password: '',
        rePassword: '',
    })
    const [informSuccess, setInformSuccess] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (auth.user && auth.user.role === '1') { // sadmin doesn't need to modify profile
            history.push('/danh-muc');
        }
    }, [])

    const logoutHandle = () => {
        localStorage.removeItem("autobi-auth");
        localStorage.removeItem("expirationDate");
        logout();
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
                method: "put",
                url: baseUrl + "auth/users/change-password",
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
                data: {
                    password: info.password
                },
            })
                .then(res => {
                    if(res.status === 201) {
                        setInformSuccess(true);
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

    return (
        <div className='p-5'>
            <div className="wrap-static-info">
                <h2 className='mb-4'>Thông tin tài khoản</h2>
                <div className="group-info d-flex align-items-center mb-3">
                    <p className='mb-0 mr-3'>Tên tài khoản:</p>
                    <p className='mb-0 font-italic text-primary'>admin</p>
                </div>
                <div className="group-info d-flex align-items-center">
                    <p className='mb-0 mr-3'>Trạng thái hoạt động:</p>
                    {
                        auth.user.state === '1' ? <Badge variant="primary">Active</Badge>
                            :
                            <Badge variant="danger">Inactive</Badge>
                    }

                </div>
                <div className="logout mt-3 mb-3">
                    <Button variant="danger" onClick={logoutHandle}>Đăng xuất</Button>
                </div>
            </div>
            <hr />
            <div className="wrap-modify">
                <h2 className='mb-4'>Đổi mật khẩu</h2>
                <Form onSubmit={saveHandle}>
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

                    <Button variant="primary" type="submit">Lưu</Button>
                </Form>
                {
                    informSuccess ? <p className="text-success mt-3">Cập nhật thành công!</p> : null
                }
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);