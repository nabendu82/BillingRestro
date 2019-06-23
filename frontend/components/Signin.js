import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

class Signin extends Component {
    render() {
        return (
            <Form>
                <fieldset>
                    <h2>Sign In</h2>
                </fieldset>
            </Form>
        )
    }
}

export default Signin;
