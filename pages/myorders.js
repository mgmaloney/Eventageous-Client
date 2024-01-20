import { useEffect, useState } from 'react';
import { getPreviousOrders } from '../utils/data/orderDate';
import { useAuth } from '../utils/context/authContext';
import OrderCard from '../components/orders/orderCard';

export default function MyOrders() {
  const [myCompletedOrders, setMyCompletedOrders] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getPreviousOrders(user.id).then(setMyCompletedOrders);
  }, [user.id]);

  return (
    <>
      <div className="header">
        <h2>My Orders</h2>
      </div>
      {myCompletedOrders.length < 1 ? <h2>You have no orders</h2> : <h2>Your Orders</h2>}
      <div className="card-container">{myCompletedOrders && myCompletedOrders.map((order) => <OrderCard key={order.id} order={order} />)}</div>
    </>
  );
}
