import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import Message from "./Message";
import { useParams } from "react-router-dom";

export const StyledPostForm = styled.form`
    display: block;
    float: left;
    color: white;
    width: 40%;
    margin: 10px;
`;

class PostForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <Message
                    showMessage="true"
                    category="error"
                    headerText={error}
                    text=""
                    color="red"
                    size="mini"
                />
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    renderPostIdInput = ({ input, label, meta }) => {
        const { id } = useParams();

        if (id !== undefined) {
            return (
                <Field
                    style={{ display: "none" }}
                    name="id"
                    component=<div className="field">
                        <label>{label}</label>
                        <input {...input} autoComplete="off" />
                    </div>
                    label="Post ID"
                />
            );
        } else return <></>;
    };

    onSubmit = (formValues, props) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <>
                <StyledPostForm
                    className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Enter Title"
                    />
                    <Field
                        name="description"
                        component={this.renderInput}
                        label="Enter Description"
                    />
                    <button className="ui olive button">Submit</button>
                </StyledPostForm>
            </>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    if (!formValues.id) {
        errors.id = "An error occurred - there is no id";
    }

    return errors;
};

export default reduxForm({
    form: "postForm",
    validate,
})(PostForm);
