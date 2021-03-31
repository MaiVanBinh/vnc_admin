import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    creatures: state.creatures,
    listImages: state.listImages,
    species: state.creaturesCategories
      ? state.creaturesCategories.species
      : null,
    orders: state.creaturesCategories ? state.creaturesCategories.orders : null,
    groups: state.creaturesCategories ? state.creaturesCategories.groups : null,
    families: state.creaturesCategories
      ? state.creaturesCategories.families
      : null,
  };
};
const Filter = (props) => {
  const {
    show,
    closeHandler,
    species,
    groups,
    orders,
    families,
    search,
  } = props;
  const [filterData, setFilterData] = useState({
    species: null,
    group: null,
    order: null,
    family: null,
    name: null,
    redbook: null,
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
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Loài</Form.Label>
            {species ? (
              <Form.Control
                as="select"
                onChange={(v) =>
                  setFilterData({
                    ...filterData,
                    species: v.target.value,
                  })
                }
                value={filterData.species}
              >
                <option value={null}>Tất cả</option>
                {species
                  ? species.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name_vn}
                      </option>
                    ))
                  : null}
              </Form.Control>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Lớp</Form.Label>
            {groups ? (
              <Form.Control
                as="select"
                onChange={(v) =>
                  setFilterData({
                    ...filterData,
                    group: v.target.value,
                  })
                }
                value={filterData.group}
              >
                <option value={null}>Tất cả</option>
                {groups
                  ? groups.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name_vn}
                      </option>
                    ))
                  : null}
              </Form.Control>
            ) : null}
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Bộ</Form.Label>
            {orders ? (
              <Form.Control
                as="select"
                onChange={(v) =>
                  setFilterData({
                    ...filterData,
                    order: v.target.value,
                  })
                }
                value={filterData.order}
              >
                <option value={null}>Tất cả</option>
                {orders
                  ? orders.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name_vn}
                      </option>
                    ))
                  : null}
              </Form.Control>
            ) : null}
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Họ</Form.Label>
            {orders ? (
              <Form.Control
                as="select"
                onChange={(v) =>
                  setFilterData({
                    ...filterData,
                    family: v.target.value,
                  })
                }
                value={filterData.family}
              >
                <option value={null}>Tất cả</option>
                {families
                  ? families.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name_vn}
                      </option>
                    ))
                  : null}
              </Form.Control>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Thuộc sách đỏ</Form.Label>
            <Form.Control
              value={filterData.redbook}
              as="select"
              onChange={(e) =>
                setFilterData({ ...filterData, redbook: e.target.value })
              }
            >
              <option value={null}>Tất cả</option>
              <option value={1}>Chỉ thuộc sách đỏ</option>
            </Form.Control>
          </Form.Group>

          {/* <Form.Group>
            <Form.Label>Ngày tạo</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  value={filterData.dateFrom}
                  type="date"
                  placeholder="Ngày bắt đầu"
                  onChange={(e) =>
                    setFilterData({ ...filterData, dateFrom: e.target.value })
                  }
                />
              </Col>
              <Col sm={1}>~</Col>
              <Col>
                <Form.Control
                  value={filterData.dateTo}
                  type="date"
                  placeholder="Ngày kết thúc"
                  onChange={(e) =>
                    setFilterData({ ...filterData, dateTo: e.target.value })
                  }
                />
              </Col>
            </Row>
          </Form.Group> */}
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
