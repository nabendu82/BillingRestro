import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $price: Int){
            updateItem(
                id: $id
                title: $title
                price: $price
            ){
                id
                title
                price
            }

    }
`;

class UpdateItem extends Component {
    state = {}

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }

    updateTheItem = async (e, updateItemMutation) => {
        e.preventDefault();
        console.log('Updating Item!!');
        console.log(this.state);
        const res = await updateItemMutation({
          variables: {
            id: this.props.id,
            ...this.state,
          },
        });
        console.log('Updated!!');
        Router.push({ pathname: '/items'})
    }

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ data, loading }) => {
                    if(loading) return <p>Loading...</p>;
                    if(!data.item) return <p>No item found for ID {this.props.id}</p>;
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (
                                <Form onSubmit={e => this.updateTheItem(e, updateItem)}>
                                    <Error error={error} />
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                            <input
                                                type="text" id="title" name="title" placeholder="Title" maxLength="14"
                                                required defaultValue={data.item.title} onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor="price">
                                            Price
                                            <input
                                                type="number" id="price" name="price" placeholder="Price"
                                                required defaultValue={data.item.price} onChange={this.handleChange} />
                                        </label>
                                        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
