import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { InputMeta, InputProps } from '../AppTypes';

export const StyledPostForm = styled.form`
    display: block;
    float: left;
    color: white;
    width: 40%;
    margin: 10px;
`;

class PostForm extends React.Component<{
    handleSubmit: (formValues: any) => void;
}> {
    renderError(props: InputMeta) {
        const { error, touched } = props;
        return (
            <Message
                showMessage={true}
                category='negative'
                headerText={error}
                text=''
                color='red'
                size='mini'
            />
        );
    }

    renderInput = (props: InputProps) => {
        const { input, label, meta } = props;
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        );
    };

    renderPostIdInput = (props: InputProps) => {
        const { input, label } = props;
        const { id } = useParams();

        if (id !== undefined) {
            return (
                <Field
                    name='id'
                    component={
                        <div className='field'>
                            <label>{label}</label>
                            <input {...input} autoComplete='off' />
                        </div>
                    }
                    label='Post ID'
                />
            );
        } else return <></>;
    };

    render() {
        return (
            <>
                <StyledPostForm
                    className='ui form error'
                    onSubmit={this.props.handleSubmit}
                >
                    <Field
                        name='title'
                        component={this.renderInput}
                        label='Enter Title'
                    />
                    <Field
                        name='description'
                        component={this.renderInput}
                        label='Enter Description'
                    />
                    <button className='ui olive button'>Submit</button>
                </StyledPostForm>
            </>
        );
    }
}

const validate = (formValues: { title: any; description: any; id: any }) => {
    const errors = { title: '', description: '', id: '' };

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    if (!formValues.id) {
        errors.id = 'An error occurred - there is no id';
    }

    return errors;
};

export default reduxForm<{}, any>({
    form: 'postForm',
    validate,
})(PostForm);
