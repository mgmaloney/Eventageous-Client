import { useEffect, useState } from 'react';
import { getAllEvents } from '../utils/data/eventData';
import ItemCard from '../components/items/EventCard';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  return (
    <div className="shopping">
      <div className="events">{events && events.map((item) => <ItemCard item={item} />)}</div>
    </div>
  );
}

export default Home;
