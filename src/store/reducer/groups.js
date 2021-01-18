import { GROUP_ERROR,
    // CREATE_GROUP_ERROR,
    CREATE_GROUP_SUCCESS,
    GROUP_START,
    FETCH_GROUP_SUCCESS,
    GROUPS_END_FORM,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_ERROR,
    UPDATE_GROUP_SUCCESS
} from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    groups: null,
    total: null,
    error: null,
    loading: false,
    submitSuccess: null,
    submitError: null,
}

const createGroupsSuccess = (state, action) => {
    const groupsUpdate = JSON.parse(JSON.stringify(state.groups));
    groupsUpdate.unshift(action.newGroup);
    groupsUpdate.pop();
    return updateObject(state, { groups: groupsUpdate, loading: false, submitSuccess: true});
} 

const deleteGroupSuccess = (state, action) => {
    const groupsUpdate = state.groups.filter(item => item.id !== action.id);
    return updateObject(state, {
        groups: groupsUpdate
    })
}

const deleteGroupError = (state, action) => {
    return updateObject(state, {submitError: action.error});
}

const updateGroupSuccess = (state, action) => {
    const newGroup = action.dataUpdate;
    const groupsUpdate = state.groups.map(item => {
        if(item.id === newGroup.id) {
            return newGroup;
        }
        return item;
    })
    return updateObject(state, {groups: groupsUpdate, submitSuccess: true, loading: false});
}

export default function reducer(state = initState, action) {
    switch(action.type) {
        case FETCH_GROUP_SUCCESS: {
            const groups = action.groups;
            const numberResults = action.total;
            return {
                total: numberResults,
                groups: groups,
                error: null
            }
        };
        case GROUP_ERROR: return { error: action.error };
        case GROUP_START: return updateObject(state, { loading: true});
        case CREATE_GROUP_SUCCESS: return createGroupsSuccess(state, action);
        case GROUPS_END_FORM: return updateObject(state, {submitSuccess: null});
        case DELETE_GROUP_SUCCESS:  return deleteGroupSuccess(state, action);
        case DELETE_GROUP_ERROR: return deleteGroupError(state, action);
        case UPDATE_GROUP_SUCCESS: return updateGroupSuccess(state, action);
        default: return state;
    }
}