import UserHeader from "./UserHeader";
import styled from "styled-components";
import { PostProps } from "../AppTypes";

const PostElementContentStyle = styled.section`
    padding: 5px;
`;

export const PostAuthor = styled.h3`
    text-align: left;
    padding: 5px;
`;

export const PostTitle = styled.h4`
    text-align: left;
    padding: 5px;
    margin: 0px;
    background-color: #dcedc8;
    padding: 5px;
    font-weight: bold;
`;

const Post: React.FunctionComponent<PostProps> = ({
    id,
    userId,
    title,
    body,
}) => {
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
            <PostAuthor>
                <UserHeader user={user} userId={userId} />
            </PostAuthor>
            <PostTitle>
                <b>{title}</b>
            </PostTitle>
            <PostElementContentStyle>{body}</PostElementContentStyle>
        </>
    );
};

export default Post;
