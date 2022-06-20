import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Modal from "../components/Modal";
import history from "../history";
import { deletePost, fetchPost } from "../actions";

const onDismiss = () => {
    history.push("/Blog");
    history.go("/Blog");
};

const PostDelete = (props) => {
    const { id } = useParams();

    const renderActions = (
        <React.Fragment>
            <button
                className="ui button negative"
                onClick={() => {
                    props.deletePost(id);
                }}
            >
                Delete
            </button>
            <button className="ui button">Cancel</button>
        </React.Fragment>
    );

    useEffect(() => {
        props.fetchPost(id);
    }, []);

    const renderContent = (props) => {
        if (!props.state.postsReducer.data) {
            return "Are you sure you want to delete this post?";
        } else {
            if (props.state.postsReducer.data.title !== "") {
                return `Are you sure you want to delete this post with title: ${props.state.postsReducer.data.title}`;
            }
        }
    };

    return (
        <div>
            Post delete
            <Modal
                title="Delete post"
                content={renderContent(props)}
                actions={renderActions}
                onDismiss={onDismiss}
            />
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        state: state,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchPost,
            deletePost,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDelete);
