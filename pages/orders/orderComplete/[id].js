import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderDate';
import OrderCard from '../../../components/orders/orderCard';

export default function OrderComplete() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id]);

  return (
    <>
      <h2>Order Complete!</h2>
      <OrderCard order={order} />
    </>
  );
}
