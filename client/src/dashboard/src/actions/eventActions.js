import axios from "axios";
import {serverName} from '../global';

export function fetchEvent() {
    return function (dispatch) {
        dispatch({type: "FETCH_EVENT"});
        axios.get(`${serverName}cofunding/hasEventement/`)
            .then((response) => {
                dispatch({type: "FETCH_EVENT_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_EVENT_REJECTED", payload: err})
            })
    }
}
