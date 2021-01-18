import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    assets: null,
    loading: null,
    error: null,
    total: 0,
    formSubmit: false
}

const createAssetSuccess = (state, action) => {
    const updateAsset = [...state.assets];
    updateAsset.pop();
    updateAsset.unshift(action.asset);
    return updateObject(state, { loading: false, assets: updateAsset, formSubmit: 'success'});
} 

const deleteAssetSuccess = (state, action) => {
    const updateAsset = state.assets.filter(item => item.id !== action.id);
    return updateObject(state, { loading: false, assets: updateAsset});
}
const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.ASSETS_START: return updateObject(state, { loading: true, error: false});
        case actionsType.FETCH_ASSETS_SUCCESS: return updateObject(state, { loading: false, assets: action.assets.assets, total: action.assets.total});
        case actionsType.ASSET_ERROR: return updateObject(state, { loading: false, error: action.error});
        case actionsType.CREATE_ASSET_SUCCESS: return createAssetSuccess(state, action);
        case actionsType.DELETE_ASSET_SUCCESS: return deleteAssetSuccess(state, action);
        default: return state;
    }
}

export default reducer;