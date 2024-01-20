import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getPaymentTypes = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/payment_types`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    return 'getPaymentTypes failed';
  }
};

export default getPaymentTypes;
