/**
 * Created by shenlin on 8/30/17.
 */
/**
 * Created by shenlin on 6/20/17.
 */
export default function reducer(state = {
    projects: [],
    projectsBackup: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_RESA": {
            return {...state, fetching: true}
        }
        case "FETCH_RESA_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_RESA_FULFILLED": {
            let temp = action.payload;
            temp.forEach((e) => {
                e.showDocs = false
            });
            temp.forEach((e) => {
                e.showDocsSlider = false
            });
            return {
                ...state,
                fetching: false,
                fetched: true,
                projects: temp,
                projectsBackup: state.projects,
            }
        }
        case "INITIALIZE_RESA": {
            return {
                ...state,
                projectsBackup: state.projects
            }
        }
        case "FILTER_BY_NAME_RESA": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.project.project_name === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_LOCATION_RESA": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.project.adresse_societe === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_DOMAIN_RESA": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.project.activity_domain === action.payload
                    })
                }
            }
        }

        case "SET_SHOW_DOCS_RESA": {
            return {
                ...state,
                projectsBackup: state.projectsBackup.map((resevation) => {
                    if (resevation.id === action.payload) {
                        resevation.showDocs = !resevation.showDocs
                    }
                    return resevation
                })
            }

        }
        case "SET_SHOW_DOCS_RESA_SLIDER": {

            return {
                ...state,
                projectsBackup: state.projectsBackup.map((resevation) => {
                    if (resevation.id === action.payload) {
                        resevation.showDocsSlider = !resevation.showDocsSlider
                    }
                    return resevation
                })
            }

        }
        case "CHANGE_SHOW_DOCS_RESA_SLIDER": {

            return {
                ...state,
                projectsBackup: state.projectsBackup.map((resevation) => {
                    resevation.showDocsSlider = false;
                    return resevation
                })
            }

        }
    }
    return state
}