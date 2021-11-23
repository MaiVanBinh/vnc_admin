import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    category: state.category,
    listImages: state.listImages,
  };
};

const Filter = (props) => {
  const { show, closeHandler, category, search } = props;
  const [filterData, setFilterData] = useState({
    is_publish: null,
    category: null,
    dateFrom: null,
    dateTo: null,
    language: null
  });
  return (
    <Modal
      show={show}
      onHide={() => closeHandler()}
      backdrop="static"
      keyboard={false}
      enforceFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Lọc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Chế độ</Form.Label>
            <Form.Control
              value={filterData.is_publish}
              as="select"
              onChange={(e) =>
                setFilterData({ ...filterData, is_publish: e.target.value })
              }
            >
              <option value={null}>Tất cả</option>
              <option value={"true"}>Publish</option>
              <option value={"false"}>Private</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngôn ngữ</Form.Label>
            <Form.Control
            value={filterData.language}
              as="select"
              onChange={(e) =>
                setFilterData({ ...filterData, language: e.target.value })
              }
            >
              <option value={null}>Tất cả</option>
              <option value={"vn"}>Việt</option>
              <option value={"en"}>Anh</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Danh mục</Form.Label>
            {category ? (
              <Form.Control
                as="select"
                onChange={(v) =>
                  setFilterData({ ...filterData, category: `[${v.target.value}]` })
                }
                value={filterData.category}
              >
                <option value={null}>
                  Tất cả
                </option>
                {category.category.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name_vn}
                  </option>
                ))}
              </Form.Control>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngày tạo</Form.Label>
            <Row>
              <Col>
                <Form.Control value={filterData.dateFrom} type="date" placeholder="Ngày bắt đầu" onChange={(e) => setFilterData({...filterData, dateFrom: e.target.value})} />
              </Col>
              <Col sm={1}>~</Col>
              <Col>
                <Form.Control value={filterData.dateTo} type="date" placeholder="Ngày kết thúc" onChange={(e) => setFilterData({...filterData, dateTo: e.target.value})} />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeHandler()}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            closeHandler();
            search(filterData);
          }}
        >
          Tìm kiếm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps)(Filter);
