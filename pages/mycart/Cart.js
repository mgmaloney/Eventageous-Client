import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import OrderContext from '../../utils/context/orderContext';
import CartTicket from '../../components/events/cartTicket';
import { getDiscreteEventTickets } from '../../utils/data/orderDate';

export default function Cart() {
  const { order, setOrder } = useContext(OrderContext);
  const [cartTickets, setCartTickets] = useState([]);

  useEffect(() => {
    if (order.id) {
      getDiscreteEventTickets(order.id).then(setCartTickets);
    }
  }, [order.id, order]);

  return (
    <div className="order-container">
      <h2>Your Cart</h2>
      <div className="order-items">{cartTickets.length > 0 && cartTickets?.map((ticket) => <CartTicket order={order} ticket={ticket} setOrder={setOrder} />)}</div>
      <Link passHref href="/mycart/checkout">
        <Button variant="primary">Checkout</Button>
      </Link>
    </div>
  );
}
