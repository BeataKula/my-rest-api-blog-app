import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PostForm from "../components/PostForm";
import { createPost } from "../actions";

class CreatePostPage extends React.Component {
    onSubmit = (formValues) => {
        this.props.createPost(formValues);
    };

    render() {
        return <PostForm onSubmit={this.onSubmit} />;
    }
}

export default connect(null, { createPost })(CreatePostPage);
