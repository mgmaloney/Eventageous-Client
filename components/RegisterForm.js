import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser } from '../utils/data/userData';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
    uid: user.uid,
    address: '',
    phoneNumber: '',
    bio: '',
    isSeller: false,
  });

  useEffect(() => {
    if (user.id) {
      getSingleUser(user.id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          address: userObj.address,
          phoneNumber: userObj.phone_number,
          isSeller: userObj.is_seller,
          bio: userObj.bio,
        }));
      });
    }
  }, [user]);

  useEffect(() => {
    if (formData.isSeller === true) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  }, [formData.isSeller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = () => {
    if (isSeller) {
      setIsSeller(false);
      setFormData({ ...formData, isSeller: false });
    } else {
      setIsSeller(true);
      setFormData({ ...formData, isSeller: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const payload = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: user.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        isSeller: formData.isSeller,
      };
      updateUser(payload).then(router.push('/profile'));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* FIRST NAME FIELD */}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* LAST NAME FIELD */}
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* ADDRESS FIELD */}
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Enter your address</Form.Label>
        <Form.Control type="textarea" name="address" required value={formData.address} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Enter your phone number</Form.Label>
        <Form.Control placeholder="XXX-XXX-XXXX" name="phoneNumber" pattern="^\d{3}-\d{3}-\d{4}$" required value={formData.phoneNumber} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Group className="mb-3" controlId="bio">
        <Form.Label>Enter a small bio</Form.Label>
        <Form.Control placeholder="" name="bio" required value={formData.bio} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* IS USER SELLER FIELD */}
      <Form.Group className="mb-3" controlId="isSeller">
        Will you be selling items on Bangazon?
        <input type="checkbox" name="isSeller" value={isSeller} checked={isSeller} onChange={handleCheck} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      email: PropTypes.string,
    }),
    id: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
