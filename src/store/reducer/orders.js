import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utilities/updateObject';

const initState = {
    orders: null,
    error: null,
    total: null,
    loading: false,
    submitSuccess: null,
    submitError: null,
}

// const orderStart = (state, action) => {
//     return updateObject(state, {loading: true});
// }

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, orders: action.orders,
        error: null,
        total: action.total
    })
}

const fetchOrderError = (state,action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const createOrderSuccess = (state, action) => {
    const ordersUpdate = JSON.parse(JSON.stringify(state.orders));
    ordersUpdate.unshift(action.newOrder);
    ordersUpdate.pop();
    return updateObject(state, { orders: ordersUpdate, loading: false, submitSuccess: true});
}
const createOrderError = (state, action) => {
    return updateObject(state, { loading: false, submitError: action.error}); 
}
const deleteOrderSuccess = (state, action) => {
    const ordersUpdate = state.orders.filter(item => item.id !== action.id);
    return updateObject(state, {
        orders: ordersUpdate
    })
}

const deleteOrderError = (state, action) => {
    return updateObject(state, {submitError: action.error});
}

const updateOrderSuccess = (state, action) => {
    const newOrder = action.dataUpdate;
    const ordersUpdate = state.orders.map(item => {
        if(item.id === newOrder.id) {
            return newOrder;
        }
        return item;
    })
    return updateObject(state, {orders: ordersUpdate, submitSuccess: true, loading: false});
}
export default function reducer(state = initState, action) {
    switch(action.type) {
        case actionsType.ORDER_START: return updateObject(state, { loading: true });
        case actionsType.FETCH_ORDER_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionsType.ORDER_ERROR: return fetchOrderError(state, action);
        case actionsType.CREATE_ORDER_SUCCESS: return createOrderSuccess(state, action);
        case actionsType.CREATE_ORDER_ERROR: return createOrderError(state, action);
        case actionsType.DELETE_ORDER_SUCCESS:  return deleteOrderSuccess(state, action);
        case actionsType.DELETE_ORDER_ERROR: return deleteOrderError(state, action);
        case actionsType.UPDATE_ORDER_SUCCESS: return updateOrderSuccess(state, action);
        case actionsType.ORDERS_END_FORM: return updateObject(state, { submitSuccess: null});
        default: return state;
    }
}