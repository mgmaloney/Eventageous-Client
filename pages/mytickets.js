import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getPreviousOrders } from '../utils/data/orderDate';
import { useAuth } from '../utils/context/authContext';
import Link from 'next/link';

export default function MyTickets() {
  const [myCompletedOrders, setMyCompletedOrders] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getPreviousOrders(user.id).then(setMyCompletedOrders);
  }, [user.id]);

  return (
    <>
      {myCompletedOrders.length < 1 ? <h2>You have no tickets</h2> : <h2>Your Tickets</h2>}
      {myCompletedOrders &&
        myCompletedOrders.tickets?.map((ticket) => (
          <>
            <Card className="event-card" style={{ width: '300px' }}>
              <Card.Header>{ticket.event.name}</Card.Header>
              <Card.Img variant="top" className="ticket.event-card-img" src={ticket.event.image_url} style={{ width: '200px' }} />
              <Card.Body>
                <Card.Text>{ticket.event.description}</Card.Text>
                <Card.Text>Ticket Price: ${ticket.event.ticket?.price}</Card.Text>
                <Card.Text>Date: {ticket.event.date}</Card.Text>
                <Card.Text>
                  Seller:{' '}
                  <Link className="seller-link" passHref href={`/seller/${ticket.event.seller.id}`}>
                    {`${ticket.event.seller.first_name} ${ticket.event.seller.last_name}`}
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ))}
    </>
  );
}
