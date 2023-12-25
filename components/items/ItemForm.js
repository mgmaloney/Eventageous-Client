import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { getItemCategories } from '../../utils/data/categoryData';
import { createItem, updateItem } from '../../utils/data/itemData';

export default function ItemForm({ item }) {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    availableQuantity: 0,
    imageUrl: '',
    categoryId: '',
    seller: user.id,
  });

  useEffect(() => {
    getItemCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (item.id) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
    };
    if (item.id) {
      updateItem(payload).then(router.push('/profile'));
    } else {
      createItem(payload).then(router.push('/seller/items'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* FIRST NAME FIELD */}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Item Name</Form.Label>
        <Form.Control name="name" required value={formData.name} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* LAST NAME FIELD */}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" required value={formData.price} onChange={handleChange} />
        <Form.Number className="text-muted" />
      </Form.Group>

      {/* ADDRESS FIELD */}
      <Form.Group className="mb-3" controlId="availableQuantity">
        <Form.Label>Available Quantity</Form.Label>
        <Form.Control type="number" name="availableQuantity" required value={formData.availableQuantity} onChange={handleChange} />
        <Form.Number className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Enter a url for an image of your item</Form.Label>
        <Form.Control name="imageUrl" required value={formData.imageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Select value={formData.category} name="categoryId" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}>
        {categories &&
          categories.map((category) => (
            <option key={`category${category.id}`} value={category.id}>
              {category.description}
            </option>
          ))}
      </Form.Select>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

ItemForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    availableQuantity: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    }),
    seller: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};
