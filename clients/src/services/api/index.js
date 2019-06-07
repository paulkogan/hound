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
    const result = await httpClient.get(`/list`);
    return result.data.data
  };