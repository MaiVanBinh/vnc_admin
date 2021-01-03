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
  species: "Species Id",
  created_by_name: "OwnerId",
  created_at: "Created Day",
  updated_at: "Last Update",
};

const Groups = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entires, ] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchKey, setSearchKey] = useState(null);

  const changeSearchKeyHandler = (key) => {
    setSearchKey(key);
  }
  
  useEffect(() => {
    if(searchKey) {
      props.onFetchGroups(entires, currentPage, `name_vn=${searchKey}`);
    } else {
      props.onFetchGroups(entires, currentPage);
    }
    
  }, [currentPage, entires, searchKey]);

  const resetClickHandler = () => {
    props.onFetchGroups(entires, 1);
    setCurrentPage(1);
    setSearchKey(null);
  }
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
    props.onDeleteGroup(deleteItem.id, props.token);
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

  const onEditGroup = (item) => {
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
          mode="orders"
          cancelDelete={cancelDelete}
          deleteConfirmHandler={deleteConfirmHandler}
        />
      </Modal>
      <TableAdminvV1
        tableConfig={TABLE_CONFIG}
        data={props.groupsData}
        total={props.total}
        fetchData={fetchData}
        onSearchData={changeSearchKeyHandler}
        onEdit={onEditGroup}
        deleteClick={onDeleteHandler}
        sideBarClick={props.sideBarHanlder}
        createClick={onShowFormHandler}
        resetClick={resetClickHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groupsData: state.groups.groups,
    total: state.groups.total,
    token: state.auth.token,
    speciesLoading: state.species.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchGroups: (entires, page, filter) =>
      dispatch(actions.fetchGroups(entires, page, filter)),
    onDeleteGroup: (id, token) => dispatch(actions.deleteGroup(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
