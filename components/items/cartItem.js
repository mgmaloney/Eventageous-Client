import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { updateOrder } from '../../utils/data/orderDate';

export default function CartItem({ item, order }) {
  const [numberInCart, setNumberInCart] = useState(0);

  useEffect(() => {
    const arrayOfItem = order.items.map((orderItem) => orderItem.id === item.id);
    setNumberInCart(arrayOfItem.length);
  }, [order.items, item.id]);

  const handleRemoveItemFromCart = async () => {
    const itemsArr = order.items.map((orderItem) => orderItem.id !== item.id);
    await updateOrder(order.id, { ...order, items: itemsArr });
  };

  const handleQuantity = async (e) => {
    if (e.target.value === 0) {
      await handleRemoveItemFromCart();
    } else {
      const itemsArr = order.items.map((orderItem) => orderItem.id !== item.id);
      for (let i = 1; i <= numberInCart; i++) {
        itemsArr.push(item.id);
      }
      console.log('🚀 ~ file: cartItem.js:27 ~ handleQuantity ~ itemsArr:', itemsArr);
      await updateOrder(order.id, { ...order, items: itemsArr });
    }
  };

  return (
    <div className="cart-item-container">
      <Card className="cart-item">
        <Card.Img className="cart-item-img" src={item.imageUrl} />
        <Card.Body>
          <Card.Text>{item.name}</Card.Text>
          <Card.Text>
            Seller: {item.seller.first_name} {item.seller.last_name}
          </Card.Text>
          <Card.Text>${item.price}</Card.Text>
          <label>
            Quantity:
            <input type="number" min="0" max={item.availableQuantity} value={numberInCart} name="numberInCart" onChange={handleQuantity} />
          </label>
          <Card.Text className="item-quant-total">${item.price * numberInCart}</Card.Text>
          <Button variant="danger" onClick={handleRemoveItemFromCart}>
            Remove Item From Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    availableQuantity: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};
