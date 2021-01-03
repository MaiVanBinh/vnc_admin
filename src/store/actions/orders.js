import * as actionsType from "./actionTypes";
import { getApi, baseUrl, headerAuthConfig } from "../utilities/apiConfig";
import axios from "axios";

const fetchOrdersSuccess = (data) => {
  return {
    type: actionsType.FETCH_ORDER_SUCCESS,
    orders: data.orders,
    total: data.total,
  };
};

const ordersError = (errMessage) => {
  return {
    type: actionsType.ORDER_ERROR,
    error: errMessage,
  };
};
export const fetchOrders = (entires, page, filter) => {
  return (dispatch) => {
    const api = getApi(
      "GET",
      "orders",
      null,
      `entires=${entires}&page=${page}&${filter}`
    );
    axios
      .get(api)
      .then((res) => dispatch(fetchOrdersSuccess(res.data.data)))
      .catch((err) => dispatch(ordersError(err.message)));
  };
};
const orderStart = () => {
  return {
    type: actionsType.ORDER_START,
  };
};

const createOrderSuccess = (newOrder) => {
  return {
    type: actionsType.CREATE_ORDER_SUCCESS,
    newOrder: newOrder,
  };
};

const createOrderError = (errMessage) => {
  return {
    type: actionsType.CREATE_SPECIES_ERROR,
    error: errMessage,
  };
};

export const createOrder = (name_vn, name_latin, group, token) => {
  return (dispatch) => {
    dispatch(orderStart());
    const header = headerAuthConfig(token);
    axios
      .post(
        `${baseUrl}auth/orders`,
        { name_vn: name_vn, name_latin: name_latin, group: group },
        header
      )
      .then((res) => dispatch(createOrderSuccess(res.data.data)))
      .catch((err) => dispatch(createOrderError(err.message)));
  };
};

export const endFormOrders = () => {
  return {
    type: actionsType.ORDERS_END_FORM
  }
}
const deleteOrderSuccess = (id) => {
  return {
    type: actionsType.DELETE_ORDER_SUCCESS,
    id: id
  }
}

const deleteOrderError = (errMessage) => {
  return  {
    type: actionsType.DELETE_ORDER_ERROR,
    error: errMessage
  }
}

export const deleteOrder = (id, token) => {
  return dispatch => {
    // dispatch(speciesStart());
    const header = headerAuthConfig(token);
    axios.delete(`${baseUrl}auth/orders/${id}`, header)
      .then(res => dispatch(deleteOrderSuccess(id)))
      .catch(err => dispatch(deleteOrderError(err.message)));
  }
}

const updateOrderSuccess = (dataUpdate) => {
  return {
    type: actionsType.UPDATE_ORDER_SUCCESS,
    dataUpdate: dataUpdate
  }
}

export const updateOrder =(id, name_vn, name_latin, group, token) => {
  return dispatch => {
    dispatch(orderStart());
    const header = headerAuthConfig(token);
    axios.put(`${baseUrl}auth/orders/${id}`, {name_vn: name_vn, name_latin: name_latin, group: group}, header)
      .then(res => dispatch(updateOrderSuccess(res.data.data)))
      .catch(err => dispatch(createOrderError(err.message)));
  }
}