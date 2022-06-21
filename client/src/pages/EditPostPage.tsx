import { connect } from "react-redux";
import PostForm from "../components/PostForm";
import { editPost } from "../actions";
import { EditPostConnectedProps, PostFormAttr } from "../AppTypes";
import { useParams } from "react-router-dom";
import _ from "lodash";

const EditPostPageWrapper = (props: EditPostConnectedProps) => {
    return <EditPostPage {...props} />;
};

const EditPostPage = (props: EditPostConnectedProps) => {
    const { id } = useParams();
    const onSubmit = (formValues: PostFormAttr) => {
        props.editPost(formValues, id);
    };

    const listPost: any = props.editPostResponse.postsReducer.allList.data;

    if (id !== undefined) {
        const index = Number(id) - 1;
        const data = listPost[index];

        return <PostForm initialValues={data} onSubmit={onSubmit} />;
    } else {
        return <PostForm onSubmit={onSubmit} />;
    }
};
const mapStateToProps = (state: any) => {
    return {
        editPostResponse: state,
    };
};

export default connect(mapStateToProps, { editPost })(EditPostPageWrapper);
