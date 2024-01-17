import PropTypes from 'prop-types';
import { useContext } from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import OrderContext from '../../utils/context/orderContext';
import { addTicketToOrder, updateOrder } from '../../utils/data/orderDate';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ event }) {
  const { order, setOrder } = useContext(OrderContext);
  const { user } = useAuth();

  const handleAddToCart = async () => {
    alert(`Ticket to ${event.name} added to cart!`);
    addTicketToOrder(order.id, { eventId: event.id }).then(setOrder);
  };

  return (
    <div className="event-card-container">
      <Card className="event-card" style={{ width: '300px' }}>
        <Card.Header>{event.name}</Card.Header>
        <Card.Img variant="top" className="event-card-img" src={event.image_url} style={{ width: '200px' }} />
        <Card.Body>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text>${event.ticket?.price}</Card.Text>
          <Card.Text>Tickets Available: {event.tickets_available}</Card.Text>
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
