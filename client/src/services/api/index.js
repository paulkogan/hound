import axios from 'axios';
//import moment from 'moment';
//import * as utils from '../utils';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  withCredentials: false,
});


export const fetchEnergizers = async () => {
    const result = await httpClient.get(`/api/energizers/`);
    return result.data.data
  };


  export const createEnergizer = async params => {
    return httpClient.post('/api/energizers/create', params);
  };

  export const updateEnergizer = async params => {
    return httpClient.post('/api/energizers/update', params);
  };
