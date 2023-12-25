/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function ShowUser() {
  const { user } = useAuth();

  return (
    <Card className="profile-card">
      <Card.Body>
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        <h3>Contact information</h3>
        <span>
          <h4>{user.address}</h4>
          <h4>{user.phone_number}</h4>
          <h4>{user.email}</h4>
          <h4>{user.bio}</h4>
        </span>
        <Button className="profle-btn" type="button" variant="primary" onClick={signOut}>
          Log Out
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ShowUser;
