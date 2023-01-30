import UserHeader from './UserHeader';
import styled from 'styled-components';
import { TextareaAutosize } from '@material-ui/core';

const CommentElementContentStyle = styled.section`
    padding: 20px;
    font-size: 14px;
`;

export const CommentAuthor = styled.h3`
    text-align: left;
    padding: 5px;
    font-size: 12px;
`;

const Comment: React.FunctionComponent<any> = ({ id, userId, comment }) => {
    let user = {
        userById: {
            isLoading: false,
            error: false,
            data: {
                id: 0,
                name: '',
                username: '',
                email: '',
                address: {},
                phone: '',
                website: '',
                company: {},
            },
        },
    };

    return (
        <>
            <CommentElementContentStyle>
                <CommentAuthor>
                    <UserHeader user={user} userId={userId} />
                </CommentAuthor>
                <TextareaAutosize
                    aria-label='minimum height'
                    minRows={3}
                    placeholder='Add comment'
                    style={{ width: 200 }}
                />
            </CommentElementContentStyle>
        </>
    );
};

export default Comment;
