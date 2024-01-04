import { Card } from 'react-bootstrap';

export default function OrderCard({ order }) {
  return (
    <>
      <Card className="order-card">
        <Card.Title>Order Details:</Card.Title>
        <Card.Body>
          <Card.Text className="order-card-list-item">
            {order.customer.first_name} {order.customer.last_name}
          </Card.Text>
          <Card.Text className="order-card-list-item">Payment Type: {order.payment_type}</Card.Text>
          <Card.Text className="order-card-list-item">Total: {order.total}</Card.Text>
          <Card.Text className="order-card-list-item">Billing Address: {order.billing_address}</Card.Text>
          {order.billing_address !== order.shipping_address ? <Card.Text>Ship to: {order.shipping_address}</Card.Text> : <li>Ship to: {order.billing_address}</li>}
          <Card.Text>Date Completed: {order.date_completed}</Card.Text>
          <Card.Text>{order.items?.map((item) => item.name)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
