import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            image
            price
        }
    }

`;

const ItemList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
`;

class Items extends Component {
    render() {
        return (
            <div>
                <Query query={ALL_ITEMS_QUERY}>
                    {({data, error, loading}) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <ItemList>
                                {data.items.map(item => <Item item={item} key={item.id} />)}
                               </ItemList>;
                    }}
                </Query>
            </div>
        )
    }
}

export default Items;
export { ALL_ITEMS_QUERY };
