import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { format } from 'date-fns';
import { deleteEvent, getSingleEvent } from '../../utils/data/eventData';
import { addTicketToOrder, hasOrderCheck } from '../../utils/data/orderDate';
import OrderContext from '../../utils/context/orderContext';
import { useAuth } from '../../utils/context/authContext';

export default function EventDetails() {
  const router = useRouter();
  const { order, setOrder } = useContext(OrderContext);
  const { user } = useAuth();
  const { id } = router.query;
  const [event, setEvent] = useState({});

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
  }, [id]);

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
    if (window.confirm(`Delete ${event.name}?`)) {
      const deleteResponse = await deleteEvent(event.id);
      if (deleteResponse.includes('error')) {
        alert(`${deleteResponse}`);
      } else {
        router.push('/myevents');
      }
    }
  };

  return (
    <>
      {event && (
        <div className="event-card-container">
          <Card className="event-card" style={{ width: '600px', height: '800px' }}>
            <Card.Header>{event.name}</Card.Header>
            <div className="event-card-detail">
              <Card.Img variant="top" className="event-card-img" src={event.image_url} style={{ width: '300px' }} />
              <Card.Body>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>Ticket Price ${event.ticket?.price}</Card.Text>
                <Card.Text>Tickets Available: {event.tickets_available}</Card.Text>
                <Card.Text>{event.date && format(new Date(event.date), 'yyyy-M-d, h:mmbbb')}</Card.Text>
                <Card.Text>
                  Seller:{' '}
                  <Link className="seller-link" passHref href={`/seller/${event.seller?.id}`}>
                    {`${event.seller?.first_name} ${event.seller?.last_name}`}
                  </Link>
                </Card.Text>
                {event.seller?.id !== user.id ? (
                  <Button variant="primary" onClick={handleAddToCart}>
                    Add ticket to Cart
                  </Button>
                ) : (
                  <>
                    <Link passHref href={`/events/edit/${event.id}`}>
                      <Button>Edit Event</Button>
                    </Link>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete Event
                    </Button>
                  </>
                )}
              </Card.Body>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
