import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function OrderTicket({ order, ticket }) {
  const [numberInOrder, setNumberInOrder] = useState(0);

  useEffect(() => {
    if (order.id) {
      const arrayOfTickets = order.tickets?.filter((orderTicket) => orderTicket.id === ticket.id);
      setNumberInOrder(arrayOfTickets.length);
    }
  }, [order, order.tickets, ticket.id]);

  return (
    <div className="order-ticket">
      <p>Event: {ticket.event.name}</p>
      <p>Number of Tickets: {numberInOrder}</p>
    </div>
  );
}

OrderTicket.propTypes = {
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
  }).isRequired,
  ticket: PropTypes.shape({
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
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      tickets_available: PropTypes.number,
      image_url: PropTypes.string,
      seller: PropTypes.shape({
        id: PropTypes.number,
        uid: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
};
