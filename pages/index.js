import { useEffect, useState } from 'react';
import { getAllItems, getItemsByCategoryId } from '../utils/data/itemData';
import ItemCard from '../components/items/ItemCard';
import { getItemCategories } from '../utils/data/categoryData';

function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterSelect, setFilterSelect] = useState('all');

  useEffect(() => {
    getAllItems().then(setItems);
  }, []);

  useEffect(() => {
    getItemCategories().then(setCategories);
  }, []);

  const handleFilter = (e) => {
    if (e.target.value === 'all') {
      setFilterSelect('all');
      getAllItems().then(setItems);
    } else {
      setFilterSelect(e.target.value);
      getItemsByCategoryId(e.target.value).then(setItems);
    }
  };

  return (
    <div className="shopping">
      <div className="filter-selects">
        <select value={filterSelect} onChange={handleFilter}>
          <option value="all">All Items</option>
          {categories && categories.map((category) => <option value={category.id}>{category.description}</option>)}
        </select>
      </div>
      <div className="shopping-items">{items && items.map((item) => <ItemCard item={item} />)}</div>
    </div>
  );
}

export default Home;
