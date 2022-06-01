import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "../components/UserHeader";

class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchPostsAndUsers();
        console.log("src/pages/PostList.js/componentDidMount/props");
        console.log(this.props);
    }

    componentDidUpdate() {
        console.log("src/pages/PostList.js/componentDidUpdate/props");
        console.log(this.props);
    }

    renderList() {
        console.log("src/pages/PostList.js/renderList/props");
        console.log(this.props);
        return this.props.posts.map((post) => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId} />
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="ui relaxed divided list">{this.renderList()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
