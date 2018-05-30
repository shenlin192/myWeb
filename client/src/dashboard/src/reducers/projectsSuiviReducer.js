/**
 * Created by shenlin on 6/14/17.
 */
export default function reducer(state = {
    projects: [{id: -1, supporter_collection: [], defisc: [], contractor: {}}],
    projectsBackup: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_PROJECTS_SUIVI": {
            return {...state, fetching: true}
        }
        case "FETCH_PROJECTS_SUIVI_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_PROJECTS_SUIVI_FULFILLED": {
            let temp = action.payload;
            console.log(temp);
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
            }
        }
        case "INITIALIZE_PROJECT_SUIVI": {
            // for deep colon projects
            return {
                ...state,
                projectsBackup: JSON.parse(JSON.stringify(state.projects))
            }
        }
        case "FILTER_BY_LOCATION_SUIVI": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.adresse_societe === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_DOMAIN_SUIVI": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.activity_domain === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_NAME_SUIVI": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    projectsBackup: state.projectsBackup.filter((e) => {
                        return e.name === action.payload
                    })
                }
            }
        }
        case "SET_SHOW_DOCS_PROJECT": {
            return {
                ...state,
                projectsBackup: state.projectsBackup.map((project) => {
                    if (project.id === action.payload) {
                        project.showDocs = !project.showDocs
                    }
                    return project
                })
            }
        }
        case "SET_SHOW_DOCS_PROJECT_SLIDER": {
            return {
                ...state,
                projectsBackup: state.projectsBackup.map((project) => {
                    if (project.id === action.payload) {
                        project.showDocsSlider = !project.showDocsSlider
                    }
                    return project
                })
            }
        }
        case "CHANGE_SHOW_DOCS_PROJECT_SLIDER": {
            return {
                ...state,
                projectsBackup: state.projectsBackup.map((project) => {
                    project.showDocsSlider = false
                    return project
                })
            }
        }
    }

    return state
}