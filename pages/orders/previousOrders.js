import { useEffect, useState } from 'react';
import { getPreviousOrders } from '../../utils/data/orderDate';
import OrderCard from '../../components/orders/orderCard';
import { useAuth } from '../../utils/context/authContext';

export default function PreviousOrders() {
  const { user } = useAuth()
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    getPreviousOrders(user.id).then(setPreviousOrders);
  }, [user.id]);

  return (
    <>
      <div className="previous-orders">
        <h2>Past Orders</h2>
        {previousOrders && previousOrders.map((order) => <OrderCard order={order} />)}
      </div>
    </>
  );
}
