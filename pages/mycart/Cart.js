import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import OrderContext from '../../utils/context/orderContext';
import CartItem from '../../components/items/cartItem';
import { getAllItems } from '../../utils/data/itemData';

export default function Cart() {
  const { order, setOrder } = useContext(OrderContext);

  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems().then(setAllItems);
  }, []);

  useEffect(() => {
    const itemIds = [];
    const items = [];
    order.items?.forEach((item) => {
      if (!items.includes(item.id)) {
        itemIds.push(item.id);
      }
    });
    allItems.forEach((item) => {
      if (itemIds.includes(item.id)) {
        items.push(item);
      }
    });
    setCartItems(items);
  }, [order.items, allItems]);

  return (
    <div className="order-container">
      <h2>Your Cart</h2>
      <div className="order-items">{cartItems && cartItems.map((item) => <CartItem order={order} item={item} setOrder={setOrder} />)}</div>
      <Link passHref href="/mycart/checkout">
        <Button variant="primary">Checkout</Button>
      </Link>
    </div>
  );
}
