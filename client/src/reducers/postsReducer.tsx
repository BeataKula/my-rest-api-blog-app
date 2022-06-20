import _ from "lodash";
import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    FETCH_POST,
} from "../actions/actionsTypes";
import { PostAction } from "../AppTypes";

export default (
    state = {
        isLoading: null,
        error: null,
        data: null,
    },
    action: PostAction
) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                allList: {
                    isLoading: true,
                    error: null,
                    data: null,
                },
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                allList: {
                    isLoading: false,
                    error: false,
                    data: action.payload,
                },
            };
        case GET_POSTS_FAIL:
            return {
                ...state,
                allList: {
                    isLoading: false,
                    error: true,
                    data: action.payload,
                },
            };
        case CREATE_POST:
            return {
                ...state,
                data: action.payload,
            };
        case EDIT_POST:
            return {
                ...state,
                id: action.payload.id,
                data: action.payload,
            };
        case FETCH_POST:
            return {
                ...state,
                id: action.payload.id,
                data: action.payload,
            };
        case DELETE_POST:
            return deleteAction;
        default:
            return state;
    }
};

const deleteAction = (
    state = {
        isLoading: null,
        error: null,
        data: null,
    },
    action: any
) => {
    return _.omit(state, action.payload);
};
