import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import { hasOrderCheck } from './data/orderDate';
import OrderContext from './context/orderContext';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (!userLoading && user.id) {
      hasOrderCheck(user.id).then(setOrder);
    }
  }, [user]);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <OrderContext.Provider value={{ order, setOrder }}>
          <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
          <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
        </OrderContext.Provider>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
