/**
 * Created by shenlin on 8/1/17.
 */
/**
 * Created by shenlin on 6/20/17.
 */
export default function reducer(state = {
    slug: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_EVENT": {
            return {...state, fetching: true}
        }
        case "FETCH_EVENT_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_EVENT_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                slug: action.payload.slug,
            }
        }
    }
    return state
}