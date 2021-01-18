import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities/updateObject";
import { NUMBER_PER_PAGE } from "../../constant";
const initState = {
  filterData: null,
  creatures: null,
  creature: null,
  numberOfPages: null,
  loadingFilter: false,
  loadingCreatures: false,
  redBook: {
    1: null,
    2: null,
    3: null,
  },
  error: null,
  page: 1,
  total: 0,
  redBookLoading: false,
  formState: null
};

const fetchFilterDataStart = (state, action) => {
  return updateObject(state, { loadingFilter: true, error: null });
};

const fetchFilterDataSuccess = (state, action) => {
  return updateObject(state, {
    filterData: action.filterData.data,
    loadingFilter: false,
  });
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
  return updateObject(state, {
    loadingCreatures: false,
    creatures: action.creatures.creatures,
    total: action.creatures.total,
    numberOfPages: Math.ceil(action.creatures.total / NUMBER_PER_PAGE),
  });
};

const fetchCreaturesByIdSuccess = (state, action) => {
  return updateObject(state, { creature: action.creature });
};

const fetchCreaturesByIdError = (state, action) => {
  return updateObject(state, { error: action.errMessage });
};

const fetchCreaturesRedBookSucces = (state, action) => {
  const redBookUpdate = {
    ...state.redBook,
    [action.species.toString()]: action.creatures
  }
  return updateObject(state, {redBook: redBookUpdate, redBookLoading: false});
};

const fetchCreaturesRedBookStart = (state, action) => {
  return updateObject(state, {redBookLoading: true});
};

const deleteCreatureSuccess = (state, action) => {
  const updateCreature = state.creatures.filter(item => item.id !== action.id);
  return updateObject(state, {loadingCreatures: false, creatures: updateCreature})
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
    case actionTypes.FETCH_CREATURES_BY_ID_SUCCESS:
      return fetchCreaturesByIdSuccess(state, action);
    case actionTypes.FETCH_CREATURES_BY_ID_ERROR:
      return fetchCreaturesByIdError(state, action);
    case actionTypes.FETCH_CREATURES_REDBOOK_SUCCESS:
      return fetchCreaturesRedBookSucces(state, action);
    case actionTypes.FETCH_CREATURES_REDBOOK_START:
      return fetchCreaturesRedBookStart(state, action);
    case actionTypes.DELETE_CREATURE_SUCCESS: return deleteCreatureSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
