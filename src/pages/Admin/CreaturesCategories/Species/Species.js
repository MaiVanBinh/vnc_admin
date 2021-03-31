import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../../store/actions/actionTypes";
import { IconPlus, IconRefresh } from "./../../../../store/utilities/SVG";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    species: state.species,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setListSpecies: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_SPECIES,
        payload,
      }),
  };
};

const Species = (props) => {
  const { auth, species, setListSpecies, setLoader } = props;
  const [ showCreate, setShowCreate ] = useState(false);

  useEffect(() => {
    getSpeciesList();
  }, []);
  const getSpeciesList = () => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "species",
    }).then((res) => {
      //   const { begin, end } = getIndexListPage(filterList.page, filterList.limit, res.data.data.total);
      //   res.data.data.pages.begin = begin;
      //   res.data.data.pages.end = end;
      setListSpecies(res.data.data);
      setLoader(false);
    });
  };

  return (
    <div className="container-fluid pt-3 pb-5">
      {/* <div className="wrap-action mb-3">
        <Button
          className="btn-primary mr-2"
          onClick={() => {
            setShowCreate(true);
            // setTitleCreate("");
            // setValid({
            //   message: "Tên danh mục không được để rỗng",
            //   valid: true,
            // });
          }}
        >
          <IconPlus width={15} height={15} color={"#fff"} />
        </Button>
        <Button>
          <IconRefresh width={15} height={15} color={"#fff"} />
        </Button>
      </div> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tiếng việt</th>
            <th>Tên tiếng anh</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody className="list-images">
          {species && species.length > 0 ? (
            species.map((e, i) => {
              let beginIndex = 1;
              return (
                <tr key={i}>
                  <td>{beginIndex + i}</td>
                  <td>{e.name_vn}</td>
                  <td>{e.name_en}</td>
                  <td>{e.created_at}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="text-center mb-0">
                  Không có kết quả nào được tìm thấy
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* create */}
      {/* <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo loài</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Tên loài</Form.Label>
              <Form.Control
                className={valid.valid ? null : "form-control is-invalid"}
                type="title"
                placeholder="Nhập tên danh mục"
                value={titleCreate}
                onChange={(v) => onChangeTitle(v.target.value)}
              />
              {!valid.valid ? (
                <Form.Control.Feedback type="invalid">
                  {valid.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={saveHandle}>
            Lưu
          </Button> */}
        {/* </Modal.Footer>
      </Modal> */} 
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Species);
