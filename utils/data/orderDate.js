import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const hasOrderCheck = async (userId) => {
  try {
    const { data } = await axios.post(`${dbUrl}/users/${userId}/has_order`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'hasOrderCheck failed';
  }
};

const getSingleOrder = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/orders/${id}`);
    return data;
  } catch (e) {
    console.warn(e);
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
    console.warn(e);
    return 'getAllItems failed';
  }
};

const updateOrder = async (id, payload) => {
  try {
    const { data } = await axios.put(`${dbUrl}/orders/${id}`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return 'updateOrder failed';
  }
};

export { hasOrderCheck, getSingleOrder, getPreviousOrders, updateOrder };
