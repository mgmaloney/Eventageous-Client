import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getItemCategories = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/categories`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return 'createCategory failed';
  }
};

const createCategory = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/categories`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'createCategory failed';
  }
};

const updateCategory = async (id, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/categories/${id}`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'updateCategory failed';
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/categories/${id}`);
    return response;
  } catch (e) {
    console.warn(e);
    return 'deleteCategory failed';
  }
};

export {
  getItemCategories, createCategory, updateCategory, deleteCategory,
};
