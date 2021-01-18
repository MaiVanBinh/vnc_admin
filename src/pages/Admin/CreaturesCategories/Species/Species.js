import React, { useState, useEffect } from "react";
import TableAdminvV1 from "../../../../components/UI/TableAdminvV1/TableAdminvV1";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import FormCreate from "../FormCreate/FormCreate";
import Modal from "../../../../components/UI/Modal/Modal";
import Loading from "../../../../components/UI/Loader/Loader";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

const TABLE_CONFIG = {
  id: "Id",
  name_vn: "Name VN",
  name_en: "Name En",
  created_by_name: "OwnerId",
  created_at: "Created Day",
  updated_at: "Last Update",
};

const Species = (props) => {
  const [currentPage, ] = useState(1);
  const [entires, ] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    props.onFetchSpecies(entires, currentPage);
  }, [currentPage, entires, props.onFetchSpecies]);
  const onShowFormHandler = (mode, isEditing, itemEdit) => {
    setIsEditing(isEditing);
    setShowForm((prev) => !prev);
    if (isEditing) {
      setCurrentEdit(itemEdit);
    }
  };
  const deleteConfirmHandler = () => {
    props.onDeleteSpecies(deleteItem.id, props.token);
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
    setIsEditing(true);
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
            type="species"
            isEditing={isEditing}
            itemEdit={currentEdit}
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
        data={props.speciesData}
        onEdit={onEditCreature}
        deleteClick={onDeleteHandler}
        sideBarClick={props.sideBarHanlder}
        createClick={onShowFormHandler}
        hiddenFilter={true}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    speciesData: state.species.species,
    token: state.auth.token,
    speciesLoading: state.species.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSpecies: () => dispatch(actions.fetchSpecies()),
    onDeleteSpecies: (id, token) => dispatch(actions.deleteSpecies(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Species);
