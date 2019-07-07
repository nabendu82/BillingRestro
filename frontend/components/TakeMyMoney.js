import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($userId: ID!) {
    createOrder(userId: $userId) {
      id
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {

    render() {
        return (
            <User>
                {({ data: { me } }) => (
                    <Mutation
                        mutation={CREATE_ORDER_MUTATION}
                        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        variables={{ userId: me.id }}
                    >{(createOrder) => (
                        <p onClick={async () => {
                            NProgress.start();
                            const order = await createOrder().catch(err => alert(err.message));
                            Router.push({
                                pathname: '/order',
                                query: { id: order.data.createOrder.id },
                            });
                        }}>
                            {this.props.children}
                        </p>
                    )}</Mutation>

                )}
            </User>
        );
    }
}

export default TakeMyMoney;