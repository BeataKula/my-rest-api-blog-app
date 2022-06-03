import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import auth from "./authReducer";

export default combineReducers({
    auth: auth,
    postsReducer: postsReducer,
    usersReducer: usersReducer,
});
