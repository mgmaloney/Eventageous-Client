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
    let date = new Date(Date.now());
    let isoDate = date.toISOString();
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
      .then(router.push(`/ordercomplete/${order.id}`));
  };

  return (
    <>
      <div className="checkout-form">
        <Form onSubmit={handleSubmit}>
          {/* FIRST NAME FIELD */}
          <Form.Group className="mb-3" controlId="paymentType">
            <Form.Label>Select Payment Type</Form.Label>
            <Form.Select name="paymentType" onChange={handleChange} value={formData.paymentType}>
              {paymentTypes && paymentTypes.map((paymentType) => <option value={paymentType.id}>{paymentType.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="billingAddress">
            <Form.Label>Billing Address: </Form.Label>
            <Form.Control name="billingAddress" required value={formData.billingAddress} onChange={handleChange} />
            <Form.Text className="text-muted" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="total-div">
        <h4 className="total">Total: ${total}</h4>
      </div>
    </>
  );
}
