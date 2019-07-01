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
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      console.log(me);
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <CloseButton title="close" onClick={toggleCart}>
                      &times;
                    </CloseButton>
                    <Supreme>Bill</Supreme>
                    <p>
                      You have {me.cart.length} item
                      {me.cart.length === 1 ? "" : "s"} to bill
                    </p>
                  </header>
                  <ul>
                    {me.cart.map(billItem => (
                      <BillItem key={billItem.id} billItem={billItem} />
                    ))}
                  </ul>
                  <footer>
                    <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                    <SickButton>CheckOut</SickButton>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

export default Bill;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
