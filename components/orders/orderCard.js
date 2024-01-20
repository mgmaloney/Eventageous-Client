import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getDiscreteEventTickets } from '../../utils/data/orderDate';
import OrderTicket from '../events/orderTicket';
import { format } from 'date-fns';

export default function OrderCard({ order }) {
  const [orderTickets, setOrderTickets] = useState([]);

  useEffect(() => {
    if (order.id) {
      getDiscreteEventTickets(order.id).then(setOrderTickets);
    }
  }, [order.id, order]);

  return (
    <div className="card">
      <Card className="order-card">
        <Card.Title>Order on {order.date_completed && format(new Date(order.date_completed), 'M-d-yyyy h:mmbbb')}</Card.Title>
        <Card.Body>
          <Card.Text className="order-card-list-ticket">
            {order.customer?.first_name} {order.customer?.last_name}
          </Card.Text>
          <Card.Text className="order-card-list-ticket">Payment Type: {order.payment_type?.name}</Card.Text>
          <Card.Text className="order-card-list-ticket">Total: {order.total}</Card.Text>
          <Card.Text className="order-card-list-ticket">Billing Address: {order.billing_address}</Card.Text>
          {orderTickets.map((ticket) => (
            <OrderTicket key={ticket.id} ticket={ticket} order={order} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
