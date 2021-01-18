import React, { useState, useEffect } from "react";
import TableAdminvV1 from "../../../components/UI/TableAdminvV1/TableAdminvV1";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import FormCreate from "./FormCreate/FormCreate";
import Modal from "../../../components/UI/Modal/Modal";
import Loading from "../../../components/UI/Loader/Loader";
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm";

const TABLE_CONFIG = {
  id: "Id",
  username: "Username",
  email: "Email",
  role: "Role",
  created_by: "Created by",
  created_at: "Created Day",
  updated_at: "Last Update",
};

const Users = (props) => {
  const [currentPage, ] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    props.onFetchUsers(props.token);
  }, [currentPage]);

  const onShowFormHandler = (mode, isEditing, itemEdit) => {
    // setIsEditing(isEditing);

    setShowForm((prev) => !prev);
    if (isEditing) {
      setCurrentEdit(itemEdit);
    }
  };

  const onCreaeHandler = () => {
    setShowForm((prev) => !prev);
    setCurrentEdit(null);
  }

  const deleteConfirmHandler = () => {
    props.onDeleteUser(deleteItem.id, props.token);
    setDeleteItem(null);
  };

  const cancelDelete = () => {
    setDeleteItem(null);
  };
  
  const onDeleteHandler = (item) => {
    setDeleteItem(item);
  }
  useEffect(() => { 
    if(deleteItem) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [deleteItem]);
  
  useEffect(() => {
    if(currentEdit) {
      setShowForm(true);
    }
  }, [currentEdit]);

  const onEditCreature = (item) => {
    setCurrentEdit(item);
  }

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
            // isEditing={isEditing}
            // itemEdit={currentEdit}
          />
        )}
      </Modal>
      <Modal show={showDelete}>
        <DeleteConfirm
          deleteItem={deleteItem}
          mode="species"
          cancelDelete={cancelDelete}
          deleteConfirmHandler={deleteConfirmHandler}
        />
      </Modal>
      <TableAdminvV1
        tableConfig={TABLE_CONFIG}
        data={props.users}
        onEdit={onEditCreature}
        deleteClick={onDeleteHandler}
        sideBarClick={props.sideBarHanlder}
        createClick={onCreaeHandler}
        hiddenFilter={true}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    users: state.users.users,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
    onDeleteUser: (id, token) => dispatch(actions.deleteUser(id, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
