import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { changeTicketsInOrder, getDiscreteEventTickets, getNumberInCart, hasOrderCheck, removeEventTicketsFromOrder } from '../../utils/data/orderDate';
import { useAuth } from '../../utils/context/authContext';

export default function CartTicket({ ticket, order, setOrder, setCartTickets }) {
  const [numberInCart, setNumberInCart] = useState();
  const [numberNotZero, setNumberNotZero] = useState(false);
  const [changed, setChanged] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getNumberInCart(order.id, { ticketId: ticket.id })
      .then((response) => setNumberInCart(Number(response)))
      .then(setNumberNotZero(true));
  }, [ticket.id]);

  const handleRemoveTicketFromCart = async () => {
    if (window.confirm(`Remove all ${ticket.event.name} tickets from order?`)) {
      const removeResponse = await removeEventTicketsFromOrder(order.id, { userId: user.id, ticketId: ticket.id });
      if (typeof response === 'string') {
        const updatedOrder = await hasOrderCheck(user.id);
        setOrder(updatedOrder);
        const cartTickets = await getDiscreteEventTickets(order.id);
        setCartTickets(cartTickets);
      } else {
        await setOrder(removeResponse);
        const cartTickets = await getDiscreteEventTickets(order.id);
        setCartTickets(cartTickets);
      }
    }
  };

  useEffect(() => {
    if (numberInCart > 0 && changed) {
      changeTicketsInOrder(order.id, { userId: user.id, eventId: ticket.event.id, ticketId: ticket.id, numberToAdd: Number(numberInCart) }).then(async (response) => {
        if (typeof response === 'string') {
          await hasOrderCheck(user.id).then(setOrder);
        } else {
          await setOrder(response);
        }
      });
    }
  }, [numberInCart]);

  const handleQuantity = (e) => {
    if (Number(e.target.value) !== 0) {
      setNumberInCart(Number(e.target.value));
      setChanged(true);
    }
  };

  return (
    <div className="card">
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
            {numberNotZero && numberInCart >= 1 ? <input type="number" min="0" max={ticket.event.tickets_available} value={Number(numberInCart)} name="numberInCart" onChange={handleQuantity} /> : ''}
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
  setOrder: PropTypes.func.isRequired,
  setCartTickets: PropTypes.func.isRequired,
};
