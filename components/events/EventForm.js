import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { updateEvent, createEvent } from '../../utils/data/eventData';

export default function EventForm({ event }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ticketPrice: 0,
    ticketsAvailable: 0,
    imageUrl: '',
    date: '',
    sellerId: user.id,
  });

  useEffect(() => {
    if (event.id) {
      setFormData({ name: event.name, ticketPrice: event.ticket.price, ticketsAvailable: event.ticketsAvailable, imageUrl: event.imageUrl, date: event.date, sellerId: user.id });
    }
  }, [event.id]);

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
    };
    if (event.id) {
      updateEvent(payload).then(router.push('/profile'));
    } else {
      createEvent(payload).then(router.push('/myevents'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Event Name</Form.Label>
        <Form.Control name="name" required value={formData.name} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={formData.description} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ticketPrice">
        <Form.Label>Ticket Price</Form.Label>
        <Form.Control type="float" name="ticketPrice" required value={formData.ticketPrice} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="availableQuantity">
        <Form.Label>Available Tickets</Form.Label>
        <Form.Control type="number" name="ticketsAvailable" min={0} required value={formData.ticketsAvailable} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Enter a url for an image of your event</Form.Label>
        <Form.Control name="imageUrl" required value={formData.imageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Label>Set a date and time for your event</Form.Label>
      <div className="date-submit">
        <input type="datetime-local" name="date" onChange={handleChange} value={formData.date} />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

EventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    ticketsAvailable: PropTypes.number,
    imageUrl: PropTypes.string,
    ticket: PropTypes.shape({
      price: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  event: {
    name: '',
    description: '',
    date: '',
    ticketPrice: 0,
    ticketsAvailable: 0,
    imageUrl: '',
    categoryId: '',
    seller: 0,
  },
};
