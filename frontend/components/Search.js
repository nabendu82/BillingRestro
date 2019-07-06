import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { CURRENT_USER_QUERY } from './User';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: {  title_contains: $searchTerm  }) {
      id
      image
      title
    }
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;


class AutoComplete extends React.Component {
    state = {
        items: [],
        loading: false,
    };
    onChange = debounce(async (e, client) => {
        console.log('Searching...');
        // turn loading on
        this.setState({ loading: true });
        // Manually query apollo client
        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: e.target.value },
        });
        this.setState({
            items: res.data.items,
            loading: false,
        });
    }, 350);
    render() {
        resetIdCounter();
        return (
            <SearchStyles>
                <Downshift itemToString={item => (item === null ? '' : item.title)}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                        <div>
                            <ApolloConsumer>
                                {client => (
                                    <input
                                        {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Add to Bill Directly',
                                            id: 'search',
                                            className: this.state.loading ? 'loading' : '',
                                            onChange: e => {
                                                e.persist();
                                                this.onChange(e, client);
                                            },
                                        })}
                                    />
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <DropDown>
                                    {this.state.items.map((item, index) => (
                                        <Mutation
                                            mutation={ADD_TO_CART_MUTATION}
                                            variables={{ id: item.id }}
                                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                                            key={item.id}
                                        >
                                            {(addToCart, { loading }) => (
                                                <DropDownItem
                                                    key={item.id}
                                                    {...getItemProps({ item })}
                                                    highlighted={index === highlightedIndex}
                                                    disabled={loading} onClick={addToCart}
                                                >
                                                    <img width="50" src={item.image} alt={item.title} />
                                                    {item.title}
                                                </DropDownItem>
                                            )}
                                        </Mutation>
                                    ))}
                                    {!this.state.items.length &&
                                        !this.state.loading && <DropDownItem> Nothing Found {inputValue}
                                        </DropDownItem>}
                                </DropDown>
                            )}
                        </div>
                    )}
                </Downshift>
            </SearchStyles>
        );
    }
}

export default AutoComplete;