/**
 * Created by shenlin on 11/06/2017.
 */
import {combineReducers} from "redux"

import tweets from "./tweetsReducer";
import userProfile from "./userProfileReducer";
import routerPath from "./routerReducer";
import projectsSuivi from "./projectsSuiviReducer";
import projectOfTheWeek from "./projectOfTheWeekReducer";
import investments from "./investmentReducer";
import ownProject from "./ownProjectReducer";
import selectSearch from "./selectReducer";
import event from "./eventReducer";
import resa from "./resaReducer";

export default combineReducers({
    tweets,
    routerPath,
    projectsSuivi,
    projectOfTheWeek,
    investments,
    userProfile,
    ownProject,
    selectSearch,
    event,
    resa,
})