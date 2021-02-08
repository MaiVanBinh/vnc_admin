import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './ImageManagement.css';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from './../../../store/utilities/apiConfig';
import * as actionTypes from './../../../store/actions/actionTypes';
import Pagination from './../../../components/Panigation/Pagination';
import { getIndexListPage } from './../../../store/utilities/common';
import { 
    IconPlus,
    IconRefresh
  } from './../../../store/utilities/SVG';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        listImages: state.listImages
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (payload) => dispatch({
            type: actionTypes.SET_LOADER, payload
        }),
        setListImages: (payload) => dispatch({
            type: actionTypes.SET_LIST_IMAGES, payload
        })
    }
}

const maxSizeUpload = 5 * 1000000; // 5mb
let count = 1; // count number of files

const ImageManagement = (props) => {
    const {
        auth,
        setLoader,
        listImages,
        setListImages
    } = props;

    const dropArea = useRef(null);
    const inputFile = useRef(null);

    const [uploadProgress, setUploadProgress] = useState({
        count: 0, totalCount: 0, received: 0, total: 100
    })

    const [showUpload, setShowUpload] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [infoImage, setInfoImage] = useState({
        id: null,
        name: '',
        url: '',
        created_at: '',
    })

    const [filterList, setFilterList] = useState({
        page: 1,
        limit: 10,
    })

    useEffect(() => {
        getListImages();
    }, [filterList])

    useEffect(() => {
        const getFile = () => {
            if (Array.from(inputFile.current.files).length > 0) {
                setLoader(true);
                sendFileUpload(inputFile.current.files, afterUpload, Array.from(inputFile.current.files).length);
            }
            else {
                // error
            }
        }
        inputFile.current && inputFile.current.addEventListener('change', getFile);

        return () => inputFile.current && inputFile.current.removeEventListener('change', getFile)
    }, [showUpload])

    const uploadHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (Array.from(e.dataTransfer.files).length > 0) {
            setLoader(true);
            sendFileUpload(e.dataTransfer.files, afterUpload, Array.from(e.dataTransfer.files).length);
        }
        else {
            // error
        }
        dropArea.current.classList.remove('mouse-over');
    }
    const dragOverHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropArea.current.classList.add('mouse-over');
    }
    const dragLeaveHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dropArea.current.classList.remove('mouse-over');
    }
    const clickHandle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        inputFile.current.click();
    }
    const afterUpload = (json) => {
        // setLoader(false);
        // console.log(json);
        getListImages();
        setShowUpload(false);
    }

    const sendFileUpload = (imgArr, callback, total) => {
        let listFiles = Array.from(imgArr);
        let data = new FormData();
        data.append('image', listFiles[0]);
        if (listFiles[0].size > maxSizeUpload) {
            alert('Dung lượng ảnh dưới 5mb!');
            setLoader(false);
            return;
        }
        let xhr = new window.XMLHttpRequest();
        xhr.open('POST', baseUrl + 'auth/images', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (xhr.response.statusCode === 200) {
                if (callback && listFiles.length === 1) {
                    count = 0;
                    setUploadProgress({ count: 0, totalCount: 0, received: 0, total: 100 }); // reset
                    callback(xhr.response.data);
                }
                else {
                    listFiles.shift();
                    count++;
                    sendFileUpload(listFiles, callback, total);
                }
            }
            else {
                setLoader(false);
            }
        }
        xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                setUploadProgress({ count, totalCount: total, received: e.loaded, total: e.total });
            }
        }, false)
        xhr.send(data);
    }

    const getListImages = () => {
        setLoader(true);
        axios({
            method: 'get',
            url: baseUrl + 'auth/images',
            headers: {
                Authorization: "Bearer " + auth.token,
            },
            params: filterList
        })
            .then(res => {
                const { begin, end } = getIndexListPage(filterList.page, filterList.limit, res.data.data.total);
                res.data.data.pages.begin = begin;
                res.data.data.pages.end = end;
                setListImages(res.data.data);
                setLoader(false);
            })
    }

    const openDelete = (item) => {
        setShowDelete(true);
        setInfoImage(item);
    }

    const deleteHandle = () => {
        setLoader(true);
        axios({
            url: baseUrl + 'auth/images/' + infoImage.id,
            method: 'delete',
            headers: {
                Authorization: "Bearer " + auth.token,
            }
        })
            .then(res => {
                setShowDelete(false);
                getListImages();
            }).catch(err => {
                setShowDelete(false);
                setLoader(false);
                alert(err.response.data.data)
            })
    }

    const changePage = (page) => {
        setFilterList({
            ...filterList, page
        })
    }

    return (
        <div className='container-fluid pt-3 pb-5'>

            <div className="wrap-action mb-3">
                <Button className='btn-primary mr-2' onClick={() => setShowUpload(true)}><IconPlus width={15} height={15} color={'#fff'} /></Button>
                <Button onClick={() => getListImages()}><IconRefresh width={15} height={15} color={'#fff'} /></Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thumbnail</th>
                        <th>Tên ảnh</th>
                        <th>URL</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className='list-images'>
                    {
                        listImages && listImages.images.length === 0 ?
                            <tr>
                                <td colSpan="6" className='text-center'>Không có kết quả nào được tìm thấy</td>
                            </tr>
                            : null
                    }
                    {
                        listImages && listImages.images.length > 0 ? listImages.images.map((e, i) => {
                            let beginIndex = listImages.pages.begin;
                            return <tr key={i}>
                                <td>{beginIndex + i}</td>
                                <td className='thumbnail'>
                                    <img src={e.url} className='img-fluid' alt="error" />
                                </td>
                                <td className='name'>{e.name}</td>
                                <td className='url'>{e.url}</td>
                                <td>{e.created_at}</td>
                                <td>
                                    {/* <Button className='mr-2'>Copy URL</Button> */}
                                    <Button onClick={() => openDelete(e)} className='btn-danger'>Xóa</Button>
                                </td>
                            </tr>
                        })
                            : null
                    }
                </tbody>
            </Table>

            <div className="pagination mt-4 d-flex justify-content-center">
                {
                    listImages ? <Pagination pagination={listImages.pages} callFetchList={changePage} /> : null
                }
            </div>

            {/* upload */}
            <Modal
                show={showUpload}
                onHide={() => setShowUpload(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tải ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={dropArea} className="wrap-area-drop p-5" style={{ cursor: 'pointer' }} onDrop={uploadHandle} onDragOver={dragOverHandle} onDragLeave={dragLeaveHandle} onClick={clickHandle}>
                        <p className="text-center mb-0">Thả ảnh hoặc click vào đây để tải ảnh lên.</p>
                    </div>
                    <input type="file" style={{ display: 'none' }} ref={inputFile} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpload(false)}>Đóng</Button>
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
                    {'Bạn có chắc muốn xóa "' + infoImage.name + '" ?'}
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
)(ImageManagement);
