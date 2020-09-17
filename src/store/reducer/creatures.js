import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities/updateObject";
import {NUMBER_PER_PAGE} from '../../constant';
const initState = {
  filterData: null,
  creatures: null,
  creature: null,
  numberOfPages: null,
  loadingFilter: false,
  loadingCreatures: false,
  error: null,
  page: 1,
};

const fetchFilterDataStart = (state, action) => {
  return updateObject(state, { loadingFilter: true, error: null });
};

const fetchFilterDataSuccess = (state, action) => {
  return updateObject(state, { filterData: action.filterData.data, loading: false });
};

const fetchFilterDataError = (state, action) => {
  return updateObject(state, {
    loadingFilter: false,
    error: action.errMessage,
  });
};

const deleteError = (state, action) => {
  return updateObject(state, { error: null });
};

const fetchCreaturesStart = (state, action) => {
  return updateObject(state, { loadingCreatures: true, error: null });
};

const fetchCreaturesSuccess = (state, action) => {
  return updateObject(state, { creatures: action.creatures.creatures, numberOfPages: Math.ceil(action.creatures.total/NUMBER_PER_PAGE)});
};

const fetchCreaturesByIdSuccess = (state, action) => {
  return updateObject(state, {creature: action.creature});
}

const fetchCreaturesByIdError = (state, action) => {
  return updateObject(state, {error: action.errMessage});
} 


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FILTER_DATA_START:
      return fetchFilterDataStart(state, action);
    case actionTypes.FETCH_FILTER_DATA_SUCCESS:
      return fetchFilterDataSuccess(state, action);
    case actionTypes.FETCH_FILTER_DATA_ERROR:
      return fetchFilterDataError(state, action);
    case actionTypes.DELETE_ERROR:
      return deleteError(state, action);
    case actionTypes.FETCH_CREATURES_START:
      return fetchCreaturesStart(state, action);
    case actionTypes.FETCH_CREATURES_SUCCESS:
      return fetchCreaturesSuccess(state, action);
    case actionTypes.FETCH_CREATURES_BY_ID_SUCCESS: return fetchCreaturesByIdSuccess(state, action);
    case actionTypes.FETCH_CREATURES_BY_ID_ERROR: return fetchCreaturesByIdError(state, action)
    default:
      return state;
  }
};

export default reducer;
