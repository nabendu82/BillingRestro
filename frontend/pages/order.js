import PleaseSignIn from '../components/PleaseSignin';
import Order from '../components/Order';

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;