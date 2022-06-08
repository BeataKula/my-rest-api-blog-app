import postsReducer from "./reducers/postsReducer";
import usersReducer from "./reducers/usersReducer";

export interface IArticle {
    id: number;
    title: string;
    body: string;
}

export type ButtonType = {
    id: string;
    name: string;
    about: "commentPrimary" | "commentHover";
    onClick: () => void;
};

export type LinkProps = {
    to: string;
    className: string;
    children: string;
};

export type categoryType = "info" | "positive" | "negative" | "warning";

export type MessageProps = {
    showMessage: boolean;
    category: categoryType;
    headerText: String;
    text: String;
    color: String;
    size: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
};

export interface PostProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type PostPayload = {
    posts: PostProps[],
    status: number,
    text: string;
    error: boolean,
    headerMessageText: string,
    messageText: string,
    showMessage: boolean,
    categoryMessage: categoryType,
};

export type PostState = {
    isLoading: boolean,
    error: boolean,
    allList: {
        isLoading: boolean,
        error: boolean,
        data: PostPayload;
    }
} 

export type PostAction = {
    type: string;
    payload: PostPayload;
};

export interface User {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {}
    "phone": string,
    "website": string,
    "company": {}
}

export type UserPayload = {
    user: User,
    status: number,
    error:boolean
};

export type UserAction = {
    type: string;
    payload: UserPayload;
};

export type UserByIdResponse  = {
    isLoading: boolean,
    error: boolean,
    data: User;
}

export interface UserHeaderType {
    postsReducer: PostState;
    usersReducer: { userById: UserByIdResponse }[];
    user?: {
        userById: UserByIdResponse
    };
    userId: number;
}

export type DispatchUserType = (args: UserAction) => UserAction;

export interface IPostForm {
    title?: string,
    body?: string
};

export interface AuthState {
    isSignedIn: null | boolean;
    userId: string | null;
}

export interface ReducersState {
    postsReducer: typeof postsReducer,
    usersReducer: typeof usersReducer,
    auth: AuthState,
}