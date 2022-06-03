import React from "react";
import { connect } from "react-redux";
import { PostState, UserByIdResponse, UserHeaderType } from "../AppTypes";
class UserHeader extends React.Component<UserHeaderType> {
    render() {
        if (
            this.props.user !== undefined &&
            this.props.user.userById !== undefined &&
            this.props.user.userById.data !== undefined
        ) {
            const user = this.props.user.userById.data;
            return <div className="header">{user.name}</div>;
        } else {
            return <div className="header">Problem z userem!</div>;
        }
    }
}

const mapStateToProps = (
    state: {
        postsReducer: PostState;
        usersReducer: { userById: UserByIdResponse }[];
    },
    props: {
        userId: number;
        user: {
            userById: UserByIdResponse;
        };
    }
) => {
    let user;
    let postsReducer = state.postsReducer;
    let usersReducer = state.usersReducer;

    function checkId(user: { userById: UserByIdResponse }) {
        if (user.userById.data.id === props.userId) {
            return user;
        }
    }

    if (state.usersReducer !== undefined) {
        user = state.usersReducer.find(checkId);
    }
    return { user, postsReducer, usersReducer };
};

export default connect(mapStateToProps)(UserHeader);
