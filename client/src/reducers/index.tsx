import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import auth from "./authReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: auth,
    postsReducer: postsReducer,
    usersReducer: usersReducer,
    form: formReducer,
});
