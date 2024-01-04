import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getItemsBySellerId } from '../../utils/data/itemData';
import ItemCard from '../../components/items/ItemCard';

export default function SellerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sellerItems, setSellerItems] = useState([]);

  useEffect(() => {
    getItemsBySellerId(id).then(setSellerItems);
  }, [id]);

  return (
    <>
      {sellerItems && <h2>{/* {sellerItems[0].seller.first_name} {sellerItems[0].seller.last_name}'s Available Items */}</h2>}
      {/* {sellerItems && sellerItems?.map((item) => <ItemCard item={item} />)} */}
    </>
  );
}
