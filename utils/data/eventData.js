import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEventsBySellerId = async (sellerId) => {
  try {
    const { data } = await axios.get(`${dbUrl}/events?sellerId=${sellerId}`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getEventsBySellerId failed';
  }
};

const getAllEvents = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/events`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getAllEvents failed';
  }
};

const getSingleEvent = async (id) => {
  try {
    const { data } = await axios.get(`${dbUrl}/events/${id}`);
    return data;
  } catch (e) {
    return 'getSingleEvent failed';
  }
};

const createEvent = async (payload) => {
  try {
    const response = await axios.post(`${dbUrl}/events`, payload);
    return response;
  } catch (e) {
    return 'createEvent failed';
  }
};

const updateEvent = async (id, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/events/${id}`, payload);
    return response;
  } catch (e) {
    return 'updateEvent failed';
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${dbUrl}/events/${id}`);
    return response;
  } catch (e) {
    return 'deleteEvent failed';
  }
};

export { getAllEvents, getEventsBySellerId, createEvent, updateEvent, deleteEvent, getSingleEvent };
