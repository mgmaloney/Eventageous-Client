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

const updateOrder = async (id, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/orders/${id}`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'updateOrder failed';
  }
};

export { hasOrderCheck, updateOrder };
