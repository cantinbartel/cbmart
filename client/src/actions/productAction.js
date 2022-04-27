import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

export const listProducts = () => (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    fetch('/api/products')
        .then(res => res.json())
        .then(data => dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }))
        .catch(error => dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        }))
}

export const productDails = (id) => (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data }))
        .catch(error => dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        }))
}