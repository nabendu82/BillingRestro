import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PleaseSignIn = (props) => <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <h3 style={{textAlign: 'center'}}>Please Sign In before Continuing</h3>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
</Query>

export default PleaseSignIn;

