/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cart } from 'react-bootstrap-icons';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Eventageous</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/myorders">
              <Nav.Link>My Orders</Nav.Link>
            </Link>
            {user.isSeller ? (
              <>
                <Link passHref href="/myevents">
                  <Nav.Link>All My Events</Nav.Link>
                </Link>
                <Link passHref href="/myactiveevents">
                  <Nav.Link>My Active Events</Nav.Link>
                </Link>
                <Link passHref href="/mypastevents">
                  <Nav.Link>My Past Events</Nav.Link>
                </Link>
                <Link passHref href="/events/new">
                  <Nav.Link>Create New Event</Nav.Link>
                </Link>
                <Link passHref href="/myrevenue">
                  <Nav.Link>Ticket Sales</Nav.Link>
                </Link>
              </>
            ) : (
              ''
            )}
            <Link passHref href="/mycart/Cart">
              <Cart color="white" size={30} className="cart-nav" />
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
