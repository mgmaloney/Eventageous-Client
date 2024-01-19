import PropTypes from 'prop-types';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import OrderContext from '../../utils/context/orderContext';
import { addTicketToOrder, hasOrderCheck } from '../../utils/data/orderDate';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent } from '../../utils/data/eventData';

export default function EventCard({ event }) {
  const { order, setOrder } = useContext(OrderContext);
  const { user } = useAuth();
  const router = useRouter();
  const [eventDate, setEventDate] = useState();
  const [today, setToday] = useState();

  useEffect(() => {
    const todaysDate = Date.now();
    const theEventDate = Date.parse(new Date(event.date));
    setToday(todaysDate);
    setEventDate(theEventDate);
  }, [event]);

  const handleAddToCart = async () => {
    alert(`Ticket to ${event.name} added to cart!`);
    addTicketToOrder(order.id, { userId: user.id, eventId: event.id, ticketId: event.ticket.id }).then(async (response) => {
      if (typeof response === 'string') {
        await hasOrderCheck(user.id).then(setOrder);
      } else {
        await setOrder(response);
      }
    });
  };

  const handleDelete = async () => {
    deleteEvent(event.id).then(router.push('/myevents'));
  };

  return (
    <div className="event-card-container">
      <Card className="event-card" style={{ width: '300px' }}>
        <Card.Header>{event.name}</Card.Header>
        <Card.Img variant="top" className="event-card-img" src={event.image_url} style={{ width: '200px' }} />
        <Card.Body>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text>Ticket Price: ${event.ticket?.price}</Card.Text>
          <Card.Text>Tickets Available: {event.tickets_available}</Card.Text>
          <Card.Text>Date: {event.date}</Card.Text>
          <Card.Text>
            Seller:{' '}
            <Link className="seller-link" passHref href={`/seller/${event.seller.id}`}>
              {`${event.seller.first_name} ${event.seller.last_name}`}
            </Link>
          </Card.Text>
          <Link passHref href={`/events/${event.id}`}>
            <Button variant="primary">View Event</Button>
          </Link>
          {event.seller.id !== user.id ? (
            <Button variant="primary" onClick={handleAddToCart}>
              Add ticket to Cart
            </Button>
          ) : (
            <>
              {today < eventDate ? (
                <>
                  <Link passHref href={`/events/edit/${event.id}`}>
                    <Button>Edit Event</Button>
                  </Link>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete Event
                  </Button>
                </>
              ) : (
                ''
              )}
            </>
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
    ticket: PropTypes.shape({
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
