/**
 * Created by shenlin on 7/26/17.
 */
export default function reducer(state = {
    selectedLocation: "tous",
    selectedDomain: "tous",
    selectedName: "tous",
}, action) {

    switch (action.type) {

        case "SET_SELECT_LOCATION": {
            return {
                ...state,
                selectedLocation: action.payload
            }
        }
        case "SET_SELECT_DOMAIN": {
            return {
                ...state,
                selectedDomain: action.payload
            }
        }
        case "SET_SELECT_NAME": {
            return {
                ...state,
                selectedName: action.payload
            }
        }


    }
    return state
}