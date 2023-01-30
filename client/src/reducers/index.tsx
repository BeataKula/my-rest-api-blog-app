import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import postReducer from './postReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    form: formReducer,
});
