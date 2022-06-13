import { connect } from "react-redux";
import PostForm from "../components/PostForm";
import { EditPost } from "../actions";
import { PostFormAttr } from "../AppTypes";

interface ConnectedProps {
    EditPost: (formValues: PostFormAttr) => void;
}

const EditPostPage = (props: ConnectedProps) => {
    const onSubmit = (formValues: PostFormAttr) => {
        //console.log("formValues");
        //console.log(formValues);
        props.EditPost(formValues);
    };
    console.log(props);
    return <PostForm onSubmit={onSubmit} />;
};
const mapStateToProps = (state: any) => {
    //console.log(state.data.postsReducer.data.id);
    console.log(state);
    return {
        editPostResponse: state,
    };
};

export default connect(mapStateToProps, { EditPost })(EditPostPage);
