import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderDate';

export default function OrderComplete() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id]);

  return (
    <>
      <div className="order-page-container">
        <h2>Order Complete</h2>
        <h3>Order Details:</h3>
        <ul>
          <li>
            {order.customer.first_name} {order.customer.last_name}
          </li>
          <li>Payment Type: {order.payment_type}</li>
          <li>Total: {order.total}</li>
          <li>Billing Address {order.billing_address}</li>
          {order.billing_address !== order.shipping_address ? <li>Ship to: {order.shipping_address}</li> : <li>Ship to: {order.billing_address}</li>}
          <li>Date Completed: {order.date_completed}</li>
        </ul>
      </div>
    </>
  );
}
