import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

export default class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    render() {
        const { item } = this.props;
        return (
            <ItemStyles>
                {item.image && <img src={item.image} alt={item.title} />}
                <Title>
                    <a>{item.title}</a>
                </Title>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <div className="buttonList">
                    <Link
                        href={{
                            pathname: 'update',
                            query: { id: item.id },
                        }}
                    >
                        <a>Edit ✏️</a>
                    </Link>
                    <DeleteItem id={item.id} />
                </div>
            </ItemStyles>
        )
    }
}
