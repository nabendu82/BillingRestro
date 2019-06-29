import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import User from './User';

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
                        {item.image && <img src={item.image} alt={item.title} />}
                        <Title>
                            <a>{item.title}</a>
                        </Title>
                        <PriceTag>{formatMoney(item.price)}</PriceTag>
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
