import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { connect } from 'react-redux';
import { SignIn, SignOut } from '../actions';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { GoogleAuthInstance, GoogleAuthProps } from '../AppTypes';

declare global {
    interface Window {
        gapi: any;
    }
}

const AuthButtonDiv = styled.div`
    width: 100%;
    text-align: right;
    margin: 5px;
`;

let authInstance: GoogleAuthInstance | null = null;

const onSignInClick = () => {
    authInstance?.signIn();
};
const onSignOutClick = () => {
    authInstance?.signOut();
};

const GoogleAuth = (props: GoogleAuthProps) => {
    const onAuthChange = (isSignedIn: Boolean) => {
        if (isSignedIn) {
            const userId = authInstance?.currentUser.get().getId();
            props.SignIn(userId ? userId : null);
        } else {
            props.SignOut();
        }
    };

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '923811828877-90t74vf4k8tpms3gvivbogqmrafp9t7r.apps.googleusercontent.com',
                    scope: 'email',
                })
                .then(() => {
                    authInstance = window.gapi.auth2.getAuthInstance();
                    const isSignedIn =
                        authInstance != null
                            ? authInstance.isSignedIn.get()
                            : false;

                    onAuthChange(isSignedIn);
                    if (authInstance != null) {
                        authInstance.isSignedIn.listen(onAuthChange);
                    }
                });
        });
    }, []);
    return <div>{renderAuthButton(props.isSignedIn)}</div>;
};

const mapStateToProps = (state: { auth: { isSignedIn: any } }) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

const generateAuthButton = (
    startIcon: {} | null | undefined,
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
    title: {} | null | undefined
) => {
    return (
        <AuthButtonDiv>
            <Button
                variant='contained'
                color='default'
                startIcon={startIcon}
                onClick={onClick}
                id='sign-out-button'
            >
                {title}
            </Button>
        </AuthButtonDiv>
    );
};

const renderAuthButton = (isSignedIn: Boolean | null) => {
    if (isSignedIn === null) {
        return null;
    } else if (isSignedIn) {
        return generateAuthButton(
            <ExitToAppIcon />,
            onSignOutClick,
            'Sign Out'
        );
    } else {
        return generateAuthButton(
            <MeetingRoomIcon />,
            onSignInClick,
            'Sign In'
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            SignIn,
            SignOut,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
