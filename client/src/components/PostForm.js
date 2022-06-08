import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import Message from "./Message";

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

    onSubmit = (formValues) => {
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
                        name="body"
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

    return errors;
};

export default reduxForm({
    form: "postForm",
    validate,
})(PostForm);
