/**
 * Created by shenlin on 6/14/17.
 */
import axios from "axios";
import {serverName} from "../global"
// const serverName = "http://dev2.hoolders.com";

export function fetchProjectsSuivi() {

    return function (dispatch) {
        dispatch({type: "FETCH_PROJECTS_SUIVI"});
        axios.get(`${serverName}api/user_management/suivi_projects/`)
            .then((response) => {
                // alert("FETCH_PROJECTS_SUIVI_FULFILLED")
                console.log(response.data.results);
                dispatch({type: "FETCH_PROJECTS_SUIVI_FULFILLED", payload: response.data.results});
                dispatch({type: "INITIALIZE_PROJECT_SUIVI", payload: {}});
            })
            .catch((err) => {
                // alert("FETCH_PROJECTS_SUIVI_REJECTED")
                console.log(err)
                dispatch({type: "FETCH_PROJECTS_SUIVI_REJECTED", payload: err})
            })
    }
}

// export function setShowDocsProject(id) {
//     return{
//         type: "SET_SHOW_DOCS_PROJECT",
//         payload:id
//     }
// }
//
// export function setShowDocsProjectSlider(id) {
//     return{
//         type: "SET_SHOW_DOCS_PROJECT_SLIDER",
//         payload:id
//     }
// }
//
// export function changeShowDocsProjectSlider(id) {
//     return{
//         type: "CHANGE_SHOW_DOCS_PROJECT_SLIDER",
//         payload:{}
//     }
// }