import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchPostsAndUsers } from "../actions";
import Post from "../components/Post";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Button from "../components/Button";
import { StyledMarginButtonLink } from "../components/LinkComponent";
import { PostFormAttr, ReducersState } from "../AppTypes";
import Comment from "../components/Comment";
import { bindActionCreators, Dispatch } from "redux";

const ADD_BLOG_LINK = "/Blog/add";

export const PostsListStyle = styled.ul`
    padding: 15px;
    padding-top: 0px;
    list-style-type: none;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 10px;
`;

const PostElementStyle = styled.section`
    margin: 10px;
    padding: 0px;
    border: #dcedc8 solid 1px;
    background-color: #f1f8e9;
`;

const PostElementFooterStyle = styled.section`
    display: block;
    margin: 0px;
    background-color: #f5f5f5;
    border-top: #dcedc8 solid 1px;
    min-height: 10vh;
`;

const AddComment = () => {};
class PostList extends Component<any, {}> {
    state = {
        posts: [],
        isloaded: false,
    };

    componentDidMount() {
        this.props.fetchPostsAndUsers();
    }

    componentDidUpdate() {
        const allList = this.props.postsReducer.allList;

        if (
            !allList.error &&
            !allList.isLoading &&
            allList.data != null &&
            !this.state.isloaded
        ) {
            this.setState({
                posts: allList.data,
                isloaded: true,
            });
        } else {
            if (allList.error && !this.state.isloaded) {
                this.setState({
                    isloaded: true,
                });
            }
        }
    }

    renderMessage() {
        if (this.state.isloaded) {
            const allList = this.props.postsReducer.allList;
            return (
                <Message
                    showMessage={allList.data.showMessage}
                    category={allList.data.categoryMessage}
                    headerText={allList.data.headerMessageText}
                    text={allList.data.messageText}
                    color="red"
                    size="large"
                />
            );
        }
    }

    renderList() {
        const ListOfPosts = this.state.posts.map((post: PostFormAttr) => {
            const buttonId = "button-" + post["id"];
            return (
                <li key={post["id"]}>
                    <PostElementStyle>
                        <Post {...post} />
                        <PostElementFooterStyle>
                            <Button
                                id={buttonId}
                                about="commentPrimary"
                                name="Dodaj komentarz"
                                onClick={AddComment}
                            />
                            <Comment userId={post["userId"]} />
                        </PostElementFooterStyle>
                    </PostElementStyle>
                </li>
            );
        });

        return (
            <>
                <PostsListStyle>{ListOfPosts}</PostsListStyle>
            </>
        );
    }
    renderCreate = () => {
        if (this.props.auth.isSignedIn) {
            return (
                <StyledMarginButtonLink
                    className="ui button top right floated basic"
                    to={ADD_BLOG_LINK}
                >
                    Add post
                </StyledMarginButtonLink>
            );
        }
    };

    render() {
        return (
            <>
                <div className="ui relaxed divided list">
                    {this.renderCreate()}
                </div>
                <Loader isActive={!this.state.isloaded} />
                <div className="ui relaxed divided list">
                    {this.renderMessage()}
                    {this.renderList()}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: ReducersState) => {
    return {
        postsReducer: state.postsReducer,
        usersReducer: state.usersReducer,
        auth: state.auth,
        form: state.form,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchPostsAndUsers,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
