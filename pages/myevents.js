import { useEffect, useState } from 'react';
import { getEventsBySellerId } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function MyEvents() {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    getEventsBySellerId(user.id).then(setMyEvents);
  }, [user.id]);

  return (
    <>
      <h2>My Events</h2>
      {myEvents && myEvents.map((event) => <EventCard event={event} />)}
      {myEvents.length === 0 ? (
        <>
          <h3>You haven't added any events</h3>
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
