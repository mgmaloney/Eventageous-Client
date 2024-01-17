import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleItem } from '../../../utils/data/itemData';
import ItemForm from '../../../components/items/ItemForm';

export default function EditItem() {
  const router = useRouter();
  const [id] = router.query;
  const [item, setItem] = useState({});

  useEffect(() => {
    getSingleItem(id).then(setItem);
  }, [id]);

  return <ItemForm item={item} />;
}
