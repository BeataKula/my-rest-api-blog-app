import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { connect } from "react-redux";
import { SignIn, SignOut } from "../actions";
import { bindActionCreators } from "redux";

const AuthButtonDiv = styled.div`
    width: 100%;
    text-align: right;
    margin: 5px;
`;

let authInstance = null;

const onSignInClick = () => {
    authInstance?.signIn();
};
const onSignOutClick = () => {
    authInstance?.signOut();
};

const GoogleAuth = (props) => {
    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const userId = authInstance?.currentUser.get().getId();
            props.SignIn(userId ? userId : null);
        } else {
            props.SignOut();
        }
    };

    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "923811828877-90t74vf4k8tpms3gvivbogqmrafp9t7r.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    authInstance = window.gapi.auth2.getAuthInstance();
                    onAuthChange(authInstance.isSignedIn.get());
                    //listening of user login status change
                    authInstance.isSignedIn.listen(onAuthChange);
                });
        });
    }, []);
    return <div>{renderAuthButton(props.isSignedIn)}</div>;
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

const generateAuthButton = (startIcon, onClick, title) => {
    return (
        <AuthButtonDiv>
            <Button
                variant="contained"
                color="default"
                startIcon={startIcon}
                onClick={onClick}
                id="sign-out-button"
            >
                {title}
            </Button>
        </AuthButtonDiv>
    );
};

const renderAuthButton = (isSignedIn) => {
    if (isSignedIn === null) {
        return null;
    } else if (isSignedIn) {
        return generateAuthButton(
            <ExitToAppIcon />,
            onSignOutClick,
            "Sign Out"
        );
    } else {
        return generateAuthButton(
            <MeetingRoomIcon />,
            onSignInClick,
            "Sign In"
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            SignIn,
            SignOut,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
