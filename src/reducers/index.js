import { combineReducers } from "redux";

import users from "./users";
import authUser from "./authUser";
import questions from "./questions";

const reducer = combineReducers({questions, users, authUser});

export default reducer;