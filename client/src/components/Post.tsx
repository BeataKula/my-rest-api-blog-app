import UserHeader from "./UserHeader";
import styled from "styled-components";
import { ReducersState, PostProps } from "../AppTypes";
import { StyledButtonLink } from "./LinkComponent";
import { connect } from "react-redux";

const EDIT_BLOG_LINK = "/Blog/edit";
const DELETE_BLOG_LINK = "/Blog/edit";

const PostElementContentStyle = styled.section`
    padding: 5px;
`;

export const PostAuthor = styled.h3`
    text-align: left;
    padding: 5px;
`;

export const PostAdmin = styled.div`
    text-align: right;
    padding: 5px;
    margin: 0px;
`;

export const PostTitle = styled.h4`
    text-align: left;
    padding: 5px;
    margin: 0px;
    background-color: #dcedc8;
    padding: 5px;
    font-weight: bold;
`;

const renderDelete = (props: PostProps) => {
    if (props.auth !== undefined && props.auth.isSignedIn) {
        const deleteBlogLink = `${DELETE_BLOG_LINK}/id/${props.id}`;
        return (
            <StyledButtonLink
                className="ui left attached button olive basic"
                to={deleteBlogLink}
            >
                Delete
            </StyledButtonLink>
        );
    }
};

const renderEdit = (props: PostProps) => {
    if (props.auth !== undefined && props.auth.isSignedIn) {
        const editBlogLink = `${EDIT_BLOG_LINK}/id/${props.id}`;
        return (
            <>
                <StyledButtonLink
                    className="right attached ui button olive basic"
                    to={editBlogLink}
                >
                    Edit
                </StyledButtonLink>
            </>
        );
    }
};

const Post: React.FunctionComponent<PostProps> = (props) => {
    let user = {
        userById: {
            isLoading: false,
            error: false,
            data: {
                id: 0,
                name: "",
                username: "",
                email: "",
                address: {},
                phone: "",
                website: "",
                company: {},
            },
        },
    };

    return (
        <>
            <PostAdmin>
                {renderDelete(props)}
                {renderEdit(props)}
            </PostAdmin>
            <PostAuthor>
                <UserHeader user={user} userId={props.userId} />
            </PostAuthor>
            <PostTitle>
                <b>{props.title}</b>
            </PostTitle>
            <PostElementContentStyle>{props.body}</PostElementContentStyle>
        </>
    );
};
const mapStateToProps = (state: ReducersState) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(Post);
