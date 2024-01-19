import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getEventsBySellerId } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';

export default function MyEvents() {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [myPastEvents, setMyPastEvents] = useState([]);

  useEffect(() => {
    getEventsBySellerId(user.id).then(setMyEvents);
  }, [user.id]);

  useEffect(() => {
    const today = Date.parse(new Date(Date.now()));
    const pastEvents = [];
    myEvents.forEach((event) => {
      const eventDate = Date.parse(event.date);
      if (eventDate < today) {
        pastEvents.push(event);
      }
    });
    setMyPastEvents(pastEvents);
  }, [myEvents]);

  return (
    <>
      <div className="header">
        <h2>My Past Events</h2>
      </div>
      <div className="card-container">{myPastEvents && myPastEvents.map((event) => <EventCard event={event} />)}</div>
      {myPastEvents.length === 0 ? (
        <>
          <h3>You don't have any past events.</h3>
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
