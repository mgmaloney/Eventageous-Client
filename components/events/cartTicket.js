import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { changeTicketsInOrder, hasOrderCheck, removeEventTicketsFromOrder, removeTicketFromOrder, updateOrder } from '../../utils/data/orderDate';
import { useAuth } from '../../utils/context/authContext';

export default function CartTicket({ ticket, order, setOrder }) {
  const [numberInCart, setNumberInCart] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (order.id) {
      const arrayOfTickets = order.tickets?.filter((orderTicket) => orderTicket.id === ticket.id);
      setNumberInCart(arrayOfTickets.length);
    }
  }, [order, order.tickets, ticket.id]);

  const handleRemoveTicketFromCart = async () => {
    removeEventTicketsFromOrder(order.id, { userId: user.id, ticketId: ticket.id }).then(async (response) => {
      if (typeof response === 'string') {
        await hasOrderCheck(user.id).then(setOrder);
      } else {
        await setOrder(response);
      }
    });
  };

  useEffect(() => {
    changeTicketsInOrder(order.id, { userId: user.id, eventId: ticket.event.id, ticketId: ticket.id, numberToAdd: Number(numberInCart) }).then(async (response) => {
      if (typeof response === 'string') {
        await hasOrderCheck(user.id).then(setOrder);
      } else {
        await setOrder(response);
      }
    });
  }, [numberInCart]);

  const handleQuantity = (e) => {
    setNumberInCart(Number(e.target.value));
    if (e.target.value === '0') {
      removeEventTicketsFromOrder({ userId: user.id, ticketId: ticket.id }).then(async (response) => {
        if (typeof response === 'string') {
          await hasOrderCheck(user.id).then(setOrder);
        } else {
          await setOrder(response);
        }
      });
    }
  };

  return (
    <div className="cart-ticket-container">
      <Card className="cart-ticket">
        <Card.Img className="cart-ticket-img" src={ticket.imageUrl} />
        <Card.Body>
          <Card.Text>{ticket.event.name}</Card.Text>
          <Card.Text>
            Seller: {ticket.event.seller.first_name} {ticket.event.seller.last_name}
          </Card.Text>
          <Card.Text>${ticket.price}</Card.Text>
          <label>
            Quantity:
            <input type="number" min="1" max={ticket.event.tickets_available} value={numberInCart} name="numberInCart" onChange={handleQuantity} />
          </label>
          <Card.Text className="ticket-quant-total">${ticket.price * numberInCart}</Card.Text>
          <Button variant="danger" onClick={handleRemoveTicketFromCart}>
            Remove Ticket From Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

CartTicket.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    availableQuantity: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};
