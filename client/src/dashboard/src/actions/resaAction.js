/**
 * Created by shenlin on 8/30/17.
 */

import axios from "axios";
import {serverName} from '../global'

export function fetchResa() {
    return function (dispatch) {
        dispatch({type: "FETCH_RESA"});
        axios.get(`${serverName}api/investisseur/resa/`)
            .then((response) => {
                dispatch({type: "FETCH_RESA_FULFILLED", payload: response.data.results})
                dispatch({type: "INITIALIZE_RESA", payload: {}})
            })
            .catch((err) => {
                dispatch({type: "FETCH_RESA_REJECTED", payload: err})
            })
    }
}


export function setShowDocsResa(id) {
    return {
        type: 'SET_SHOW_DOCS_RESA',
        payload: id
    }
}

export function setShowDocsResaSlider(id) {
    return {
        type: 'SET_SHOW_DOCS_RESA_SLIDER',
        payload: id
    }
}
export function changeShowDocResaSlider() {
    return {
        type: 'CHANGE_SHOW_DOCS_RESA_SLIDER',
        payload: {}
    }
}

