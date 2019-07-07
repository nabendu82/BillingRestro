import PleaseSignIn from '../components/PleaseSignin';
import OrderList from '../components/OrderList';

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

export default OrderPage;