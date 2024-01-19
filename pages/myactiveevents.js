import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getEventsBySellerId } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';

export default function MyEvents() {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [myActiveEvents, setMyActiveEvents] = useState([]);

  useEffect(() => {
    getEventsBySellerId(user.id).then(setMyEvents);
  }, [user.id]);

  useEffect(() => {
    const today = Date.parse(new Date(Date.now()));
    const activeEvents = [];
    myEvents.forEach((event) => {
      const eventDate = Date.parse(event.date);
      if (eventDate >= today) {
        activeEvents.push(event);
      }
    });
    setMyActiveEvents(activeEvents);
  }, [myEvents]);

  return (
    <>
      <div className="header">
        <h2>My Active Events</h2>
      </div>
      <div className="card-container">{myActiveEvents && myActiveEvents.map((event) => <EventCard event={event} />)}</div>
      {myActiveEvents.length === 0 ? (
        <>
          <h3>You don't have any active events.</h3>
          <Link passHref href="events/new">
            <Button variant="primary">Add an Event</Button>
          </Link>
        </>
      ) : (
        ''
      )}
    </>
  );
}
