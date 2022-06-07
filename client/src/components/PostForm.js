import React from "react";
import { Field, reduxForm } from "redux-form";

class PostForm extends React.Component {
    /*renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }*/

    renderInput = ({ input, label, meta }) => {
        console.log("renderInput");

        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
            </div>
        );
    };

    onSubmit = (formValues) => {
        console.log("onSubmit");
        console.log(this.props);
        //this.props.onSubmit(formValues);
    };

    render() {
        console.log("render");
        return (
            <>
                <form className="ui form error">
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Enter Title"
                    />
                </form>
            </>
        );
    }
}

export default reduxForm({
    form: "postForm",
})(PostForm);
