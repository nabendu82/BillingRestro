import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const LOCAL_STATE_QUERY = gql`
    query {
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;


const Bill = () => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
        {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                    <CartStyles open={data.cartOpen}>
                        <header>
                            <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                            <Supreme>Bill</Supreme>
                            <p>You have __ items in your bill</p>
                        </header>
                        <footer>
                            <p>10.10</p>
                            <SickButton>CheckOut</SickButton>
                        </footer>
                    </CartStyles>
                )}
            </Query>
        )}
    </Mutation>
);

export default Bill;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };