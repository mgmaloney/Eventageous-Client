import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getItemsBySellerId = async (sellerId) => {
  try {
    const { data } = await axios.get(`${dbUrl}/items?sellerId=${sellerId}`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getItemsBySellerId failed';
  }
};
const getAllItems = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/items`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'getAllItems failed';
  }
};

const getSingleItem = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/items/${id}`);
    return data;
  } catch (e) {
    console.warn(e);
    return 'getSingleItem failed';
  }
};

const createItem = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/items`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'createItem failed';
  }
};

const updateItem = async (id, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/items/${id}`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'updateItem failed';
  }
};

const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/items/${id}`);
    return response;
  } catch (e) {
    console.warn(e);
    return 'deleteItem failed';
  }
};

export { getAllItems, getItemsBySellerId, createItem, updateItem, deleteItem, getSingleItem };
