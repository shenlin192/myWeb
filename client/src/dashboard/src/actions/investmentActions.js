/**
 * Created by shenlin on 6/20/17.
 */
import axios from "axios";
import {serverName} from '../global'

export function fetchInvestment() {
    return function (dispatch) {
        dispatch({type: "FETCH_INVESTMENT"});
        axios.get(`${serverName}api/investisseur/investment/`)
            .then((response) => {
                dispatch({type: "FETCH_INVESTMENT_FULFILLED", payload: response.data.results})
                dispatch({type: "INITIALIZE_INVESTEMENTS", payload: {}})
            })
            .catch((err) => {
                dispatch({type: "FETCH_INVESTMENT_REJECTED", payload: err})
            })
    }
}

export function onChangeState() {
    return {
        type: 'SET_STATE',
        payload: {}
    }
}

export function setShowDocsInv(id) {
    return {
        type: 'SET_SHOW_DOCS_INV',
        payload: id
    }
}

export function setShowDocsInvSlider(id) {
    return {
        type: 'SET_SHOW_DOCS_INV_SLIDER',
        payload: id
    }
}
export function changeShowDocInvSlider() {
    return {
        type: 'CHANGE_SHOW_DOCS_INV_SLIDER',
        payload: {}
    }
}
