import { useContext } from 'react';
import OrderContext from '../../utils/context/orderContext';
import CartItem from '../../components/items/cartItem';

export default function Cart() {
  const { order, setOrder } = useContext(OrderContext);

  return <div className="order-container">{order.items && order.item.map((item) => <CartItem order={order} item={item} setOrder={setOrder} />)}</div>;
}
