import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $price: Int!
        $image: String){
            createItem(
                title: $title
                price: $price
                image: $image
            ){
                id
            }

    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        image: 'default.jpg',
        price: ''
    }

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }

    uploadFile = async e => {
        console.log("Uploading....")
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'BillingRestro');

        const res = await fetch('https://api.cloudinary.com/v1_1/dxkxvfo2o/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();
        this.setState({ image: file.secure_url })
    }

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (


                    <Form onSubmit={async e => {
                        e.preventDefault();
                        const res = await createItem();
                        console.log(res);
                        Router.push({ pathname: '/items'})
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                            <input
                                type="file" id="file" name="file" placeholder="Upload Image"
                                required onChange={this.uploadFile} />
                            { this.state.image &&
                                <img width="200" src={this.state.image} alt="Upload Preview" />}
                            </label>
                            <label htmlFor="title">
                                Title
                            <input
                                type="text" id="title" name="title" placeholder="Title" maxLength="14"
                                required value={this.state.title} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="price">
                                Price
                            <input
                                type="number" id="price" name="price" placeholder="Price"
                                required value={this.state.price} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
