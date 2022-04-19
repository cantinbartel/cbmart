import { response } from 'express'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const listProducts = () => (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    fetch('/api/products')
        .then(res => res.json())
        .then(data => dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }))
        .catch(error => dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        }))
}