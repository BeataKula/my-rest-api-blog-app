export interface IArticle {
    id: number;
    title: string;
    description: string;
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

export interface PostFormAttr {
    userId: number;
    id: number;
    title: string;
    description: string;
}

export type PostPayload = {
    posts: PostFormAttr[],
    status: number,
    text: string;
    error: boolean,
    headerMessageText: string,
    messageText: string,
    showMessage: boolean,
    categoryMessage: categoryType,
    id?: number
};

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
    posts: PostState;
    users: { userById: UserByIdResponse }[];
    user?: {
        userById: UserByIdResponse
    };
    userId: number;
}

export type DispatchUserType = (args: UserAction) => UserAction;

export interface AuthState {
    isSignedIn: null | boolean;
    userId: string | null;
}

export interface ReducersState {
    posts: postReducerType,
    users: { userById: UserByIdResponse }[],
    auth: AuthState,
    form: {postForm: any}
}

export type PostState = {
    isLoading: boolean,
    error: boolean,
    allList: {
        isLoading: boolean,
        error: boolean,
        data: PostPayload;
    }
} 

export interface PostProps {
    auth?: AuthState,
    dispatch?: DispatchUserType,
    userId: number,
    id: number,
    title: string,
    description: string
}

export type postReducerType = {
    isLoading: boolean,
    error: boolean,
    data?: PostFormAttr;
    allList: {
        isLoading: boolean,
        error: boolean,
        data: PostFormAttr;
    }
}
export interface ConnectedProps {
    createPost: (formValues: PostFormAttr) => void;
    createPostResponse: {
        posts: postReducerType,
        users: { userById: UserByIdResponse }[],
        auth: AuthState,
        form: {postForm: any}
    };
}
export interface EditPostConnectedProps {
    editPost: (formValues: PostFormAttr, id?: string, ) => void;
    editPostResponse: ReducersState;
    id?: String
}

export type InputMeta = { error: String; touched: boolean; }

export type InputProps = {
    input: {},
    label: string,
    meta: InputMeta
}

export type onSubmitType = (formValues: PostFormAttr) => void;