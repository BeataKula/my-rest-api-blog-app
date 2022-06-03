import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { connect } from "react-redux";
import { SignIn, SignOut } from "../actions";
import { bindActionCreators } from "redux";

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
                    // Ustawienie nasłuchu w przypadku zmiany statusu zalogowania usera
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

const renderAuthButton = (isSignedIn) => {
    if (isSignedIn === null) {
        return null;
    } else if (isSignedIn) {
        return (
            <div
                style={{
                    width: "100%",
                    textAlign: "right",
                }}
            >
                <Button
                    style={{
                        textTransform: "none",
                        margin: "5px",
                    }}
                    variant="contained"
                    color="default"
                    startIcon={<ExitToAppIcon />}
                    onClick={onSignOutClick}
                    id="sign-out-button"
                >
                    Sign Out
                </Button>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    width: "100%",
                    textAlign: "right",
                }}
            >
                <Button
                    style={{
                        textTransform: "none",
                        margin: "5px",
                    }}
                    variant="contained"
                    color="secondary"
                    startIcon={<MeetingRoomIcon />}
                    onClick={onSignInClick}
                    id="sign-in-button"
                >
                    Sign In
                </Button>
            </div>
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
