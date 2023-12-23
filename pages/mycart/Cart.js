import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import OrderContext from '../../utils/context/orderContext';
import CartItem from '../../components/items/cartItem';

export default function Cart() {
  const { order, setOrder } = useContext(OrderContext);

  return (
    <div className="order-container">
      <h2>Your Cart</h2>
      <div className="order-items">{order.items && order.items.map((item) => <CartItem order={order} item={item} setOrder={setOrder} />)}</div>
      <Link passHref href="/mycart/checkout">
        <Button variant="primary">Checkout</Button>
      </Link>
    </div>
  );
}
