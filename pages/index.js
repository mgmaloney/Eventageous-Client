import { useContext, useEffect, useState } from 'react';
import { getAllEvents } from '../utils/data/eventData';
import EventCard from '../components/events/EventCard';
import OrderContext from '../utils/context/orderContext';
import { hasOrderCheck } from '../utils/data/orderDate';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const {user} = useAuth()
  const {order, setOrder} = useContext(OrderContext)

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  useEffect(() => {
    hasOrderCheck(user.id).then(setOrder)
  }, [])

  return (
    <div className="shopping">
      <div className="events">{events && events.map((event) => <EventCard event={event} />)}</div>
    </div>
  );
}

export default Home;
