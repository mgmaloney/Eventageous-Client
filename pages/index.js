import { useEffect, useState } from 'react';
import { getAllEvents } from '../utils/data/eventData';
import EventCard from '../components/events/EventCard';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  return (
    <div className="shopping">
      <div className="events">{events && events.map((event) => <EventCard event={event} />)}</div>
    </div>
  );
}

export default Home;
