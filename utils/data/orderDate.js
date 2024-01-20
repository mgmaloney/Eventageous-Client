import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const hasOrderCheck = async (userId) => {
  try {
    const { data } = await axios.post(`${dbUrl}/users/${userId}/has_order`);
    return data;
  } catch (e) {
    return 'hasOrderCheck failed';
  }
};

const getSingleOrder = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders/${id}`);
    return data;
  } catch (e) {
    return 'getSingleOrder failed';
  }
};
const getDiscreteEventTickets = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders/${id}/order_ticket_events`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getSingleOrder failed';
  }
};

const getPreviousOrders = async (userId) => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders?customerId=${userId}&completed=True`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getAllItems failed';
  }
};

const updateOrder = async (id, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${id}`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};
const addTicketToOrder = async (orderId, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${orderId}/add_ticket`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};

const changeTicketsInOrder = async (orderId, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${orderId}/add_ticket?multiple=${payload.numberToAdd}`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};
const removeTicketFromOrder = async (orderId, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${orderId}/remove_ticket`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};
const removeEventTicketsFromOrder = async (orderId, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${orderId}/remove_ticket?all=True`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};

const getCompletedOrdersBySellerId = async (sellerId) => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders/?sellerId=${sellerId}&completed=True`, payload);
    return data;
  } catch (e) {
    return 'updateOrder failed';
  }
};

const getAllOrders = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getSingleOrder failed';
  }
};

export { getCompletedOrdersBySellerId, hasOrderCheck, getAllOrders, getSingleOrder, getDiscreteEventTickets, getPreviousOrders, updateOrder, addTicketToOrder, changeTicketsInOrder, removeTicketFromOrder, removeEventTicketsFromOrder };
