/**
 * Created by shenlin on 6/22/17.
 */
import axios from "axios";

// const serverName = "http://dev2.hoolders.com";
import {serverName} from '../global'

export function fetchOwnProject() {
    return function (dispatch) {
        dispatch({type: "FETCH_MY_PROJECT"})
        axios.get(`${serverName}api/user_management/own_project/`)
            .then((response) => {
                // has project
                if (response.data.results.length > 0) {
                    dispatch({type: "FETCH_MY_PROJECT_FULFILLED", payload: response.data.results[0]})
                }
            })
            .catch((err) => {
                dispatch({type: "FETCH_MY_PROJECT_REJECTED", payload: err})
            })
    }
}
