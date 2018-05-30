/**
 * Created by shenlin on 11/06/2017.
 */

function initialState() {
    if (localStorage.currentPath) {
        return {
            activeKey: parseInt((localStorage.currentPath), 10)
        }
    }
    else {
        return {
            activeKey: 2
        }
    }
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case "CHANGE_PATH": {
            return {...state, activeKey: action.payload}
        }
    }
    return state
}