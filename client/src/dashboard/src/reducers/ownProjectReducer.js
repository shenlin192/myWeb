/**
 * Created by shenlin on 6/22/17.
 */
export default function reducer(state = {
    project: {
        id: -1,
        supporter_collection: 0,
        defisc: [],
        end_date: null,
        contractor: {},
        activity_domain: null,
        status: null,
        invadeQuestion: null
    },
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_MY_PROJECT": {
            return {...state, fetching: true}
        }
        case "FETCH_MY_PROJECT_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_MY_PROJECT_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                project: action.payload,
            }
        }
    }

    return state
}