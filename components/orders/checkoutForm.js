import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { hasOrderCheck, updateOrder } from '../../utils/data/orderDate';
import OrderContext from '../../utils/context/orderContext';
import { useAuth } from '../../utils/context/authContext';

export default function CheckoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { order, setOrder } = useContext(OrderContext);
  const [isAddressSame, setIsAddressSame] = useState(false);

  const [formData, setFormData] = useState({
    paymentType: '',
    total: 0,
    billingAddress: '',
    shippingAddress: '',
  });

  useEffect(() => {
    let itemsTotal = 0;
    if (order.items) {
      order.items.forEach((item) => {
        itemsTotal += Number(item.price);
      });
    }
    setFormData({ ...formData, total: itemsTotal });
  }, [order.items]);

  useEffect(() => {
    if (order.id) {
      setFormData({ ...formData, customer: order.customer.id });
    }
  }, [order.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      dateCompleted: Date.now(),
      completed: true,
    };
    updateOrder(payload)
      .then(() => hasOrderCheck(user.id))
      .then(setOrder)
      .then(router.push('/ordercomplete'));
  };

  const handleAddressSame = () => {
    if (isAddressSame) {
      setIsAddressSame(false);
    } else {
      setIsAddressSame(true);
    }
  };

  return (
    <>
      <div className="checkout-form">
        <Form onSubmit={handleSubmit}>
          {/* FIRST NAME FIELD */}
          <Form.Group className="mb-3" controlId="paymentType">
            <Form.Label>Select Payment Type</Form.Label>
            <Form.Select name="paymentType" onChange={handleChange} value={formData.paymentType}>
              <option value="credit">Credit</option>
              <option value="paypal">Paypal</option>
              <option value="google">Google Pay</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="billingAddress">
            <Form.Label>Billing Address: </Form.Label>
            <Form.Control name="billingAddress" required value={formData.billingAddress} onChange={handleChange} />
            <Form.Text className="text-muted" />
          </Form.Group>
          <Form.Label>Is shipping address the same as the billing address?</Form.Label>
          <input type="checkbox" onChange={handleAddressSame} />
          {isAddressSame ? (
            ''
          ) : (
            <Form.Group className="mb-3" controlId="shippingAddress">
              <Form.Label>Shipping Address: </Form.Label>
              <Form.Control name="shippingAddress" required value={formData.shippingAddress} onChange={handleChange} />
              <Form.Text className="text-muted" />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="total-div">
        <h4 className="total">Total: ${formData.total}</h4>
      </div>
    </>
  );
}
