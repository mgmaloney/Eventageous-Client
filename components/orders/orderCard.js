import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getDiscreteEventTickets } from '../../utils/data/orderDate';
import OrderTicket from '../events/orderTicket';

export default function OrderCard({ order }) {
  const [orderTickets, setOrderTickets] = useState();

  useEffect(() => {
    if (order.id) {
      getDiscreteEventTickets(order.id).then(setOrderTickets);
    }
  }, [order.id, order]);

  return (
    <div className="card">
      <Card className="order-card">
        <Card.Title>Order on {order.date_completed}</Card.Title>
        <Card.Body>
          <Card.Text className="order-card-list-ticket">
            {order.customer?.first_name} {order.customer?.last_name}
          </Card.Text>
          <Card.Text className="order-card-list-ticket">Payment Type: {order.payment_type}</Card.Text>
          <Card.Text className="order-card-list-ticket">Total: {order.total}</Card.Text>
          <Card.Text className="order-card-list-ticket">Billing Address: {order.billing_address}</Card.Text>
          {orderTickets.map((ticket) => (
            <OrderTicket ticket={ticket} order={order} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
