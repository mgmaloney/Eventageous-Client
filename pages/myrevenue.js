import { useEffect, useState } from 'react';
import { getAllOrders } from '../utils/data/orderDate';
import { useAuth } from '../utils/context/authContext';
import { getEventsBySellerId } from '../utils/data/eventData';

export default function MyRevenue() {
  const [orders, setOrders] = useState([]);
  const [myTicketsSold, setMyTicketsSold] = useState([]);
  const [myTotalRevenue, setMyTotalRevenue] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [myActiveEvents, setMyActiveEvents] = useState([]);
  const [myPastEvents, setMyPastEvents] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  useEffect(() => {
    getEventsBySellerId(user.id).then(setMyEvents);
  }, [user.id]);

  useEffect(() => {
    const today = Date.parse(new Date(Date.now()));
    const pastEvents = [];
    const activeEvents = [];
    myEvents.forEach((event) => {
      const eventDate = Date.parse(event.date);
      if (eventDate < today) {
        pastEvents.push(event);
      }
      if (eventDate >= today) {
        activeEvents.push(event);
      }
    });
    setMyActiveEvents(activeEvents);
    setMyPastEvents(pastEvents);
  }, [myEvents]);

  useEffect(() => {
    const ticketSoldArr = [];
    orders.forEach((order) => {
      if (order.completed) {
        order.tickets.forEach((ticket) => {
          if (ticket.event.seller.id === user.id) {
            ticketSoldArr.push(ticket);
          }
        });
      }
    });
    setMyTicketsSold(ticketSoldArr);
  }, [orders]);

  useEffect(() => {
    let totalRevenue = 0;
    myTicketsSold.forEach((ticket) => {
      totalRevenue += Number(ticket.price);
    });
    setMyTotalRevenue(totalRevenue);
  }, [myTicketsSold]);

  return (
    <>
      <div className="header">
        <h2>Tickets Sales</h2>
      </div>
      <div className="ticket-sales">
        <h3>Active Events: {myActiveEvents.length}</h3>
        <h3>Past Events: {myPastEvents.length}</h3>
        <h3>Tickets Sold: {myTicketsSold.length}</h3>
        <h3>Total Revenue: ${myTotalRevenue}</h3>
      </div>
    </>
  );
}
