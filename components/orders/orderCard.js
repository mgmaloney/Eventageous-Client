import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { getDiscreteEventTickets } from '../../utils/data/orderDate';
import OrderTicket from '../events/orderTicket';

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
          <Card.Text className="order-card-list-ticket">Total: ${order.total}</Card.Text>
          <Card.Text className="order-card-list-ticket">Billing Address: {order.billing_address}</Card.Text>
          {orderTickets.map((ticket) => (
            <OrderTicket key={ticket.id} ticket={ticket} order={order} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    total: PropTypes.string,
    billing_address: PropTypes.string,
    date_completed: PropTypes.string,
    completed: PropTypes.bool,
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.string,
        availableQuantity: PropTypes.number,
        imageUrl: PropTypes.string,
        seller: PropTypes.shape({
          id: PropTypes.number,
          uid: PropTypes.string,
          first_name: PropTypes.string,
          last_name: PropTypes.string,
        }),
        event: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          date: PropTypes.string,
          tickets_available: PropTypes.number,
          image_url: PropTypes.string,
        }).isRequired,
      })
    ),
    payment_type: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};
