import {
  GROUP_ERROR,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_SUCCESS,
  GROUP_START,
  FETCH_GROUP_SUCCESS,
  GROUPS_END_FORM,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  UPDATE_GROUP_SUCCESS
} from "./actionTypes";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";
import axios from "axios";

const fetchGroupsSuccess = (data) => {
  return {
    type: FETCH_GROUP_SUCCESS,
    groups: data.groups,
    total: data.total,
  };
};

const groupsError = (errMessage) => {
  return {
    type: GROUP_ERROR,
    error: errMessage,
  };
};
export const fetchGroups = (entires, page, filter) => {
  return (dispatch) => {
    const api = getApi(
      "GET",
      "groups",
      null,
      `entires=${entires}&page=${page}&${filter}`
    );
    axios
      .get(api)
      .then((res) => dispatch(fetchGroupsSuccess(res.data.data)))
      .catch((err) => dispatch(groupsError(err.message)));
  };
};

const groupsStart = () => {
  return {
    type: GROUP_START,
  };
};

const createGroupSuccess = (newGroup) => {
  return {
    type: CREATE_GROUP_SUCCESS,
    newGroup: newGroup,
  };
};

const createGroupsError = (errMessage) => {
  return {
    type: CREATE_GROUP_ERROR,
    error: errMessage,
  };
};

export const createGroups = (name_vn, name_latin, species, token) => {
  return (dispatch) => {
    dispatch(groupsStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/groups`,
        { name_vn: name_vn, name_latin: name_latin, species: species},
        header
      )
      .then((res) => dispatch(createGroupSuccess(res.data.data)))
      .catch((err) => dispatch(createGroupsError(err.message)));
  };
};

export const endFormGroups = () => {
  return {
    type: GROUPS_END_FORM
  }
}
const deleteGroupSuccess = (id) => {
  return {
    type: DELETE_GROUP_SUCCESS,
    id: id
  }
}

const deleteGroupError = (errMessage) => {
  return  {
    type: DELETE_GROUP_ERROR,
    error: errMessage
  }
}

export const deleteGroup = (id, token) => {
  return dispatch => {
    // dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios.delete(`${baseUrl}auth/groups/${id}`, header)
      .then(res => dispatch(deleteGroupSuccess(id)))
      .catch(err => dispatch(deleteGroupError(err.message)));
  }
}

const updateGroupSuccess = (dataUpdate) => {
  return {
    type: UPDATE_GROUP_SUCCESS,
    dataUpdate: dataUpdate
  }
}

export const updateGroup =(id, name_vn, name_latin, species, token) => {
  return dispatch => {
    dispatch(groupsStart());
    const header = headerAuthConfig(token);
    axios.put(`${baseUrl}auth/groups/${id}`, {name_vn: name_vn, name_latin: name_latin, species: species}, header)
      .then(res => dispatch(updateGroupSuccess(res.data.data)))
      .catch(err => dispatch(createGroupsError(err.message)));
  }
}