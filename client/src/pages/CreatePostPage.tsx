import { connect } from "react-redux";
import PostForm from "../components/PostForm";
import { createPost } from "../actions";
import { PostFormAttr, ConnectedProps } from "../AppTypes";
import Message from "../components/Message";

const CreatePostPage = (props: ConnectedProps) => {
    const onSubmit = (formValues: PostFormAttr) => {
        props.createPost(formValues);
    };

    const renderMessage = (id: number | undefined) => {
        if (id !== undefined) {
            return (
                <Message
                    showMessage={true}
                    category={"positive"}
                    headerText=""
                    text={`Post with id = ${id} has been created`}
                    color="olive"
                    size="large"
                />
            );
        }
    };

    return (
        <>
            {renderMessage(props.createPostResponse.postsReducer.data?.id)}
            <PostForm onSubmit={onSubmit} />
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        createPostResponse: state,
    };
};

export default connect(mapStateToProps, { createPost })(CreatePostPage);
