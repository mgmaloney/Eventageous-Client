import { useEffect, useState } from 'react';

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
