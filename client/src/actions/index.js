import history from "../history";
import api from "../apis/jsonLocalApi";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_POST,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    GET_USERS_BY_ID_SUCCESS,
} from "./actionsTypes";

import _ from "lodash";
import { getPosts, getUserById } from "../apis/jsonLocalApi";

export const createPost = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await api.post("/Blog/add", { ...formValues, userId });

    dispatch({ type: CREATE_POST, payload: response.data });
    // navigate to page with stream list
    history.push("/");
    history.go("/");
};

export const SignIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const SignOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().postsReducer.allList.data)
        .map("userId")
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async (dispatch) => {
    dispatch({
        type: GET_POSTS_REQUEST,
        payload: {
            posts: [],
            status: 0,
            text: "",
            error: false,
            headerMessageText: "",
            messageText: "",
            showMessage: false,
            categoryMessage: "info",
        },
    });

    try {
        let isError = true;
        const response = await getPosts();

        if (response.status === 200) {
            isError = false;
        }

        let payload = {
            posts: response.data,
            status: response.status,
            text: response.statusText,
            error: isError,
            headerMessageText: "",
            messageText: "",
            showMessage: false,
            categoryMessage: "info",
        };

        dispatch({ type: GET_POSTS_SUCCESS, payload: payload.posts });
    } catch (error) {
        let payload = {
            posts: [],
            status: 404,
            text: error.toJSON().message,
            error: true,
            headerMessageText: "We're sorry we can't show you posts!",
            messageText:
                "An error occurred while loading data: " +
                error.toJSON().message,
            showMessage: true,
            categoryMessage: "negative",
        };

        dispatch({ type: GET_POSTS_FAIL, payload: payload });
    }
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await getUserById(id);

    dispatch({ type: GET_USERS_BY_ID_SUCCESS, payload: response.data });
};
