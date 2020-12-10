import * as actionsType from "./actionTypes";
import { baseUrl, headerAuthConfig } from "../utilities/apiConfig";
import axios from "axios";

const assetStart = () => {
  return {
    type: actionsType.ASSETS_START,
  };
};

const fetchAssetsSuccesss = (assets) => {
  return {
    type: actionsType.FETCH_ASSETS_SUCCESS,
    assets: assets,
  };
};

const assetError = (error) => {
  return {
    type: actionsType.ASSET_ERROR,
    error: error,
  };
};

export const fetchAssets = (token, page) => {
  return (dispatch) => {
    dispatch(assetStart());
    const config = headerAuthConfig(token);
    axios
      .get(`${baseUrl}auth/assets?page=${page}`, config)
      .then((res) => dispatch(fetchAssetsSuccesss(res.data.data)))
      .catch((err) => dispatch(assetError("Fetch asset wrong")));
  };
};

const createAssetSuccess = (asset) => {
    return {
        type: actionsType.CREATE_ASSET_SUCCESS,
        asset: asset
    }
}

export const createAsset = (token, payload) => {
  return (dispatch) => {
    dispatch(assetStart());
    const config = headerAuthConfig(token);
    axios.post(`${baseUrl}auth/assets`, payload, config)
    .then(res => dispatch(createAssetSuccess(res.data.data)))
    .catch(err => dispatch(assetError(err.message)));
  };
};
