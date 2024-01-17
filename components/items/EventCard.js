import PropTypes from 'prop-types';
import { useContext } from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import OrderContext from '../../utils/context/orderContext';
import { updateOrder } from '../../utils/data/orderDate';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ event }) {
  const { order, setOrder } = useContext(OrderContext);
  const { user } = useAuth();
  const handleAddToCart = async () => {
    if (Object.keys(order).includes('events')) {
      const existingEventsArr = order.events.map((existingEvent) => existingEvent.id);
      console.log('🚀 ~ file: EventCard.js:12 ~ handleAddToCart ~ existingEventsArr:', existingEventsArr);
      await updateOrder(order.id, { ...order, events: [...existingEventsArr, event.id] }).then(setOrder);
    } else {
      await updateOrder(order.id, { ...order, events: [event.id] }).then(setOrder);
    }
  };

  return (
    <div className="event-card-container">
      <Card className="event-card">
        <Card.Header>{event.name}</Card.Header>
        <Card.Img className="event-card-img" src={event.imageUrl} />
        <Card.Body>
          <Card.Text>${event.description}</Card.Text>
          <Card.Text>${event.ticket.price}</Card.Text>
          <Card.Text>Tickets Available: {event.availableQuantity}</Card.Text>
          <Card.Text>
            Seller:{' '}
            <Link className="seller-link" passHref href={`/seller/${event.seller.id}`}>
              {`${event.seller.first_name} ${event.seller.last_name}`}
            </Link>
          </Card.Text>
          {event.seller.id !== user.id ? (
            <Button variant="primary" onClick={handleAddToCart}>
              Add ticket to Cart
            </Button>
          ) : (
            <Link passHref href={`/events/edit/${event.id}`}>
              <Button>Edit Event</Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    availableQuantity: PropTypes.number,
    imageUrl: PropTypes.string,
    price: PropTypes.shape({
      price: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};
