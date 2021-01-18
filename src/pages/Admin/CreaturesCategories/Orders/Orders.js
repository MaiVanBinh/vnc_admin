import React, { useEffect, useState } from "react";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";
import FormCreate from "../FormCreate/FormCreate";
import Modal from "../../../../components/UI/Modal/Modal";
import Loading from "../../../../components/UI/Loader/Loader";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import TableAdminvV1 from "../../../../components/UI/TableAdminvV1/TableAdminvV1";

const TABLE_CONFIG = {
  id: "Id",
  name_vn: "Name VN",
  name_latin: "Name Latin",
  group: "Group Id",
  created_by_name: "OwnerId",
  created_at: "Created Day",
  updated_at: "Last Update",
};

const Orders = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entires, ] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchKey, setSearchKey] = useState(null);

  const resetClickHandler = () => {
    setSearchKey(null);
    setCurrentPage(1);
    props.onFetchOrders(entires, currentPage);
  }

  const changeSearchKeyHandler = (key) => {
    setSearchKey(key);
  }

  useEffect(() => {
    if(searchKey) {
      props.onFetchOrders(entires, currentPage, `name_vn=${searchKey}`);
    } else {
      props.onFetchOrders(entires, currentPage);
    }
  }, [currentPage, entires, searchKey]);


  const changePage = (page) => {
    setCurrentPage(page);
  };

  const onShowFormHandler = (mode, isEditing, itemEdit) => {
    setIsEditing(isEditing);
    setShowForm((prev) => !prev);
    if (isEditing) {
      setCurrentEdit(itemEdit);
    }
  };
  const deleteConfirmHandler = () => {
    props.onDeleteOrder(deleteItem.id, props.token);
    setDeleteItem(null);
  };
  const cancelDelete = () => {
    setDeleteItem(null);
  };

  const onDeleteHandler = (item) => {
    setDeleteItem(item);
  };
  useEffect(() => {
    if (deleteItem) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [deleteItem]);
  const onEditOrder = (item) => {
    setCurrentEdit(item);
  }
  useEffect(() => {
    if(currentEdit) {
      setShowForm(true);
      setIsEditing(true);
    }
  }, [currentEdit]);
  return (
    <div>
      <Modal show={showForm}>
        {props.speciesLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <FormCreate
            click={onShowFormHandler}
            type="orders"
            isEditing={isEditing}
            itemEdit={currentEdit}
          />
        )}
      </Modal>
      <Modal show={showDelete}>
        <DeleteConfirm
          deleteItem={deleteItem}
          mode="orders"
          cancelDelete={cancelDelete}
          deleteConfirmHandler={deleteConfirmHandler}
        />
      </Modal>
      <TableAdminvV1
        tableConfig={TABLE_CONFIG}
        data={props.ordersData}
        total={props.total}
        fetchData={changePage}
        onEdit={onEditOrder}
        deleteClick={onDeleteHandler}
        sideBarClick={props.sideBarHanlder}
        createClick={onShowFormHandler}
        onSearchData={changeSearchKeyHandler}
        resetClick={resetClickHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ordersData: state.orders.orders,
    token: state.auth.token,
    loading: state.orders.loading,
    total: state.orders.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (entires, page, filter) =>
      dispatch(actions.fetchOrders(entires, page, filter)),
    onDeleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
