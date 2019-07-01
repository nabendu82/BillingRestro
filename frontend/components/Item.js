import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import User from './User';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

export default class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    render() {
        const { item } = this.props;
        return (
            <User>
                {({ data }) => (
                    <ItemStyles>
                        <Mutation
                            mutation={ADD_TO_CART_MUTATION}
                            variables={{ id: item.id }}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(addToCart, { loading }) => (
                                <span disabled={loading} onClick={addToCart} style={{ cursor: 'pointer' }}>
                                    {item.image && <img src={item.image} alt={item.title} />}
                                    <Title>
                                        <a>{item.title}</a>
                                    </Title>
                                    <PriceTag>{formatMoney(item.price)}</PriceTag>
                                </span>
                            )}
                        </Mutation>
                        <div className="buttonList">
                            {data.me && data.me.permissions.some(permission => ['ADMIN', 'ITEMUPDATE'].includes(permission)) && (
                                <Link
                                    href={{
                                        pathname: 'update',
                                        query: { id: item.id },
                                    }}
                                >
                                    <a>Edit ✏️</a>
                                </Link>
                            )}
                            {data.me && data.me.permissions.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission)) && (
                                <DeleteItem id={item.id} />
                            )}
                        </div>
                    </ItemStyles>
                )}
            </User>
        )
    }
}
