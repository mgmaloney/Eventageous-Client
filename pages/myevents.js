import { useEffect, useState } from 'react';
import { getItemsBySellerId } from '../utils/data/itemData';
import { useAuth } from '../utils/context/authContext';
import ItemCard from '../components/items/ItemCard';

export default function MyEvents() {
  const { user } = useAuth();
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    getItemsBySellerId(user.id).then(setMyItems);
  }, [user.id]);

  return (
    <>
      <h2>My Inventory</h2>
      {myItems && myItems.map((item) => <ItemCard item={item} />)}
    </>
  );
}
