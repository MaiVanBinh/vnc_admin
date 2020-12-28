import React, { useEffect, useState } from "react";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";
import FormCreate from "../FormCreate/FormCreate";
import Modal from "../../../../components/UI/Modal/Modal";
import { FAMILIES_END_FORM } from "../../../../store/actions/actionTypes";
import Loading from "../../../../components/UI/Loader/Loader";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import TableAdminvV1 from "../../../../components/UI/TableAdminvV1/TableAdminvV1";

const TABLE_CONFIG = {
  id: "Id",
  name_vn: "Name VN",
  name_latin: "Name Latin",
  order: "Order Id",
  created_by: "OwnerId",
  created_at: "Created Day",
  updated_at: "Last Update",
};

const Families = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entires, setEntires] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    props.onFetchFamilies(entires, currentPage);
  }, [currentPage, entires]);

  const fetchData = (page) => {
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
    props.onDeleteFamily(deleteItem.id, props.token);
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
  const onEditFamily = (item) => {
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
            type="groups"
            isEditing={isEditing}
            itemEdit={currentEdit}
          />
        )}
      </Modal>
      <Modal show={showDelete}>
        <DeleteConfirm
          deleteItem={deleteItem}
          mode="families"
          cancelDelete={cancelDelete}
          deleteConfirmHandler={deleteConfirmHandler}
        />
      </Modal>
      <TableAdminvV1
        tableConfig={TABLE_CONFIG}
        data={props.familiesData}
        total={props.total}
        fetchData={fetchData}
        onEdit={onEditFamily}
        deleteClick={onDeleteHandler}
        sideBarClick={props.sideBarHanlder}
        createClick={onShowFormHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      familiesData: state.families.families,
      total: state.families.total,
      token: state.auth.token,
      loading: state.families.loading
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchFamilies: (entires, page, filter) =>
        dispatch(actions.fetchFamilies(entires, page, filter)),
      onDeleteFamily: (id, token) => dispatch(actions.deleteFamily(id, token))
  
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Families);
