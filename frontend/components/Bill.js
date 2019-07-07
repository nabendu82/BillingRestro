import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import User from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import BillItem from "./BillItem";
import TakeMyMoney from './TakeMyMoney';

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

const Composed = adopt({
    user: ({ render }) => <User>{render}</User>,
    toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
    localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});


const Bill = () => (
    <Composed>
        {({ user, toggleCart, localState }) => {
            const me = user.data.me;
            if (!me) return null;
            return (
                <CartStyles open={localState.data.cartOpen}>
                    <header>
                        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                        <Supreme>Bill</Supreme>
                        <p>You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} to bill</p>
                    </header>
                    <ul>{me.cart.map(billItem => <BillItem key={billItem.id} billItem={billItem} />)}</ul>
                    <footer>
                        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                        <TakeMyMoney>
                            <SickButton>CheckOut</SickButton>
                        </TakeMyMoney>
                    </footer>
                </CartStyles>

            )
        }}
    </Composed>
);

export default Bill;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
