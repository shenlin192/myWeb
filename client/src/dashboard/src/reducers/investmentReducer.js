/**
 * Created by shenlin on 6/20/17.
 */
export default function reducer(state = {
    investments: [],
    investmentsBackup: [],
    fetching: false,
    fetched: false,
    error: null,
    showInvestment: true,
}, action) {

    switch (action.type) {
        case "FETCH_INVESTMENT": {
            return {...state, fetching: true}
        }
        case "FETCH_INVESTMENT_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_INVESTMENT_FULFILLED": {
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
                investments: temp,
                investmentsBackup: state.investments,
            }
        }
        case "SET_STATE": {
            return {
                ...state,
                showInvestment: !state.showInvestment
            }
        }
        case "INITIALIZE_INVESTEMENTS": {
            return {
                ...state,
                investmentsBackup: state.investments
            }
        }
        case "FILTER_BY_NAME_INV": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    investmentsBackup: state.investmentsBackup.filter((e) => {
                        return e.project.project_name === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_LOCATION_INV": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    investmentsBackup: state.investmentsBackup.filter((e) => {
                        return e.project.adresse_societe === action.payload
                    })
                }
            }
        }
        case "FILTER_BY_DOMAIN_INV": {
            if (action.payload === "tous") {
                return {...state}
            } else {
                return {
                    ...state,
                    investmentsBackup: state.investmentsBackup.filter((e) => {
                        return e.project.activity_domain === action.payload
                    })
                }
            }
        }

        case "SET_SHOW_DOCS_INV": {
            // in order to deep copy the investment
            // let temp = JSON.parse(JSON.stringify(state.investmentsBackup));
            // find the project and change showDocs
            // for (let i=0; temp.length; i++){
            //     if (temp[i].project.project_id===action.payload){
            //         temp[i].showDocs = !temp[i].showDocs;
            //         break;
            //     }
            // }
            //
            // return {...state,
            //     investmentsBackup: temp
            // }
            return {
                ...state,
                investmentsBackup: state.investmentsBackup.map((inv) => {
                    if (inv.project.project_id === action.payload) {
                        inv.showDocs = !inv.showDocs
                    }
                    return inv
                })
            }

        }
        case "SET_SHOW_DOCS_INV_SLIDER": {

            return {
                ...state,
                investmentsBackup: state.investmentsBackup.map((inv) => {
                    if (inv.project.project_id === action.payload) {
                        inv.showDocsSlider = !inv.showDocsSlider
                    }
                    return inv
                })
            }

        }
        case "CHANGE_SHOW_DOCS_INV_SLIDER": {

            return {
                ...state,
                investmentsBackup: state.investmentsBackup.map((inv) => {
                    inv.showDocsSlider = false
                    return inv
                })
            }

        }
    }
    return state
}