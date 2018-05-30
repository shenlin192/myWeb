/**
 * Created by shenlin on 6/16/17.
 */
export default function reducer(state = {
    project: {
        id: 1,
        activity_domain: null,
        status: null,
        total_amount_requested: null,
        investisseur: null,
        adresse_societe: null,
        owner: null,
        name: null,
        invadeQuestion: null,
        endDate: null,
        supporter_collection: [],
        defisc: []
    },
    selectedProject: 0,
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_PROJECTS_OF_THE_WEEK": {
            return {...state, fetching: true}
        }
        case "FETCH_PROJECTS_OF_THE_WEEK_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_PROJECTS_OF_THE_WEEK_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                project: action.payload,
            }
        }
        case "CHANGE_PROJECT_OF_THE_WEEK": {
            return {
                ...state,
                selectedProject: action.payload.selectedProject,
            }
        }
    }

    return state
}