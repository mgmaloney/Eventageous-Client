import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { useEffect, useState } from 'react';
import { getAllItems } from '../utils/data/itemData';
import ItemCard from '../components/items/ItemCard';

function Home() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [showingItems, setShowingItems] = useState([]);

  useEffect(() => {
    getAllItems().then(setItems);
  }, []);

  useEffect(() => {
    setShowingItems(items);
  }, [items]);

  return (
    <div className="shopping">
      <div className="filter-selects">
        {/* <select value={}>
          
        </select> */}
      </div>
      <div className="shopping-items">{showingItems && showingItems.map((item) => <ItemCard item={item} />)}</div>
    </div>
  );
}

export default Home;
