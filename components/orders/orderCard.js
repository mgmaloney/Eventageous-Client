import { Card } from 'react-bootstrap';

export default function OrderCard({ order }) {
  return (
    <>
      <Card className="order-card">
        <Card.Title>Order Details:</Card.Title>
        <Card.Body>
          <Card.Text className="order-card-list-ticket">
            {order.customer?.first_name} {order.customer?.last_name}
          </Card.Text>
          <Card.Text className="order-card-list-ticket">Payment Type: {order.payment_type}</Card.Text>
          <Card.Text className="order-card-list-ticket">Total: {order.total}</Card.Text>
          <Card.Text className="order-card-list-ticket">Billing Address: {order.billing_address}</Card.Text>
          <Card.Text>Date Completed: {order.date_completed}</Card.Text>
          <Card.Text>{order.tickets?.map((ticket) => ticket.name)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
