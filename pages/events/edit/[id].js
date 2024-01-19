import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventForm from '../../../components/events/EventForm';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({});

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
  }, [id]);

  return <EventForm event={event} />;
}
