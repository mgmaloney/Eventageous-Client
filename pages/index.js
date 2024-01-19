import { useContext, useEffect, useState } from 'react';
import { getAllEvents } from '../utils/data/eventData';
import EventCard from '../components/events/EventCard';
import OrderContext from '../utils/context/orderContext';
import { hasOrderCheck } from '../utils/data/orderDate';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const { user } = useAuth();
  const { setOrder } = useContext(OrderContext);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  useEffect(() => {
    const today = Date.parse(new Date(Date.now()));
    const eventsActive = [];
    events.forEach((event) => {
      const eventDate = Date.parse(event.date);
      if (eventDate >= today) {
        eventsActive.push(event);
      }
    });
    setActiveEvents(eventsActive);
  }, [events]);

  useEffect(() => {
    hasOrderCheck(user.id).then(setOrder);
  }, [user.id]);

  return (
    <div className="shopping">
      <div className="header">
        <h2>Buy Tickets to Events!</h2>
      </div>
      <div className="card-container">{activeEvents && activeEvents.map((event) => <EventCard event={event} />)}</div>
    </div>
  );
}

export default Home;
