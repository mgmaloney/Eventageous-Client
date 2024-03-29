import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { hasOrderCheck, updateOrder } from '../../utils/data/orderDate';
import OrderContext from '../../utils/context/orderContext';
import { useAuth } from '../../utils/context/authContext';
import getPaymentTypes from '../../utils/data/categoryData';

export default function CheckoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { order, setOrder } = useContext(OrderContext);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [total, setTotal] = useState();

  const [formData, setFormData] = useState({
    paymentType: 1,
    billingAddress: '',
  });

  useEffect(() => {
    let ticketsTotal = 0;
    if (order.tickets) {
      order.tickets.forEach((ticket) => {
        ticketsTotal += Number(ticket.price);
      });
    }
    setTotal(ticketsTotal);
  }, [order, order.tickets]);

  useEffect(() => {
    if (order.id) {
      setFormData({ ...formData, customer: order.customer.id });
    }
  }, [order.id]);

  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(Date.now());
    const isoDate = date.toISOString();
    const payload = {
      ...order,
      paymentType: formData.paymentType,
      total,
      billingAddress: formData.billingAddress,
      dateCompleted: isoDate,
      completed: true,
    };
    updateOrder(order.id, payload)
      .then(() => hasOrderCheck(user.id))
      .then(setOrder)
      .then(router.push(`/orders/orderComplete/${order.id}`));
  };

  return (
    <>
      <h2>Checkout</h2>
      <h3>Tickets on Order</h3>
      <div className="checkout-tickets">
        {order.tickets &&
          order.tickets.map((ticket, index) => (
            <div className="ticket-checkout" key={`ticket_${index}`}>
              <p>{ticket.event.name}</p>
              <p>${ticket.price}</p>
            </div>
          ))}
      </div>
      <div className="total-div">
        <h4 className="total">Total: ${total}</h4>
      </div>
      <div className="checkout-form">
        <Form onSubmit={handleSubmit}>
          {/* FIRST NAME FIELD */}
          <Form.Group className="mb-3" controlId="paymentType">
            <Form.Label>Select Payment Type</Form.Label>
            <Form.Select name="paymentType" onChange={handleChange} value={formData.paymentType}>
              {paymentTypes &&
                paymentTypes.map((paymentType) => (
                  <option key={paymentType.id} value={paymentType.id}>
                    {paymentType.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="billingAddress">
            <Form.Label>Billing Address: </Form.Label>
            <Form.Control name="billingAddress" required value={formData.billingAddress} onChange={handleChange} />
            <Form.Text className="text-muted" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Checkout
          </Button>
        </Form>
      </div>
    </>
  );
}
