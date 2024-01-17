import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { updateOrder } from '../../utils/data/orderDate';

export default function CartTicket({ ticket, order, setOrder }) {
  const [numberInCart, setNumberInCart] = useState(0);

  useEffect(() => {
    const arrayOfTickets = order.tickets.filter((orderTicket) => orderTicket.id === ticket.id);
    setNumberInCart(arrayOfTickets.length);
  }, [order, order.tickets, ticket.id]);

  const handleRemoveTicketFromCart = async () => {
    const ticketsArr = order.tickets.filter((orderTicket) => orderTicket.id !== ticket.id);
    const ticketsToKeepInCart = ticketsArr.map((ticketToKeep) => ticketToKeep.id);
    updateOrder(order.id, { ...order, tickets: ticketsToKeepInCart }).then(setOrder);
  };

  const handleQuantity = async (e) => {
    if (e.target.value === 0) {
      await handleRemoveTicketFromCart();
    } else {
      const ticketsArr = order.tickets.filter((orderTicket) => orderTicket.id !== ticket.id);
      const ticketIds = ticketsArr.map((orderTicket) => orderTicket.id);
      for (let i = 1; i <= numberInCart; i++) {
        ticketIds.push(ticket.id);
      }
      const updatedOrder = await updateOrder(order.id, { ...order, tickets: ticketIds });
      setOrder(updatedOrder);
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
            <input type="number" min="0" max={ticket.event.tickets_available} value={numberInCart} name="numberInCart" onChange={handleQuantity} />
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
