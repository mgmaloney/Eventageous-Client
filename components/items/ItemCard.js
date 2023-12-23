import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import OrderContext from '../../utils/context/orderContext';
import { updateOrder } from '../../utils/data/orderDate';

export default function ItemCard({ item }) {
  const { order, setOrder } = useContext(OrderContext);
  const handleAddToCart = () => {
    if (Object.keys(order).includes('items')) {
      updateOrder(order.id, { ...order, items: [...order.items, item.id] }).then(setOrder);
    } else {
      updateOrder(order.id, { ...order, items: [item.id] }).then(setOrder);
    }
  };

  return (
    <div className="item-card-container">
      <Card className="item-card">
        <Card.Img className="item-card-img" src={item.imageUrl} />
        <Card.Body>
          <Card.Text>{item.name}</Card.Text>
          <Card.Text>${item.price}</Card.Text>
          <Card.Text>Number Available: {item.availableQuantity}</Card.Text>
          <Card.Text>Category: {item.category.description}</Card.Text>
          <Card.Text>
            Seller: {item.seller.first_name} {item.seller.last_name}
          </Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

ItemCard.propTypes = {
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
