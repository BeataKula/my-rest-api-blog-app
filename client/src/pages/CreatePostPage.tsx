import { connect } from "react-redux";
import PostForm from "../components/PostForm";
import { createPost } from "../actions";
import { PostProps } from "../AppTypes";

interface ConnectedProps {
    createPost: (formValues: PostProps) => void;
}

const CreatePostPage = (props: ConnectedProps) => {
    const onSubmit = (formValues: PostProps) => {
        props.createPost(formValues);
    };

    return <PostForm onSubmit={onSubmit} />;
};

export default connect(null, { createPost })(CreatePostPage);
