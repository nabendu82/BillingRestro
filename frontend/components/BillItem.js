import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromBill from './RemoveFromBill';

const BillItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;
  h3,
  p {
    margin: 0;
  }
`;

const BillItem = ({billItem}) => {
    // first check if that item exists
    if (!billItem.item)
    return (
        <BillItemStyles>
        <p>This Item has been removed</p>
        <RemoveFromBill id={billItem.id} />
        </BillItemStyles>
    );
    return (
        <BillItemStyles>
                  <div className="cart-item-details">
        <h3>{billItem.item.title}</h3>
        <p>
          {formatMoney(billItem.item.price * billItem.quantity)}
          {' - '}
          <em>
            {billItem.quantity} &times; {formatMoney(billItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromBill id={billItem.id} />
      </BillItemStyles>
    )
}

BillItem.propTypes = {
    billItem: PropTypes.object.isRequired
}

export default BillItem;