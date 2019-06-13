import axios from 'axios';
import cheerio from 'cheerio';


const webClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'crossOrigin': true,
    'crossDomain': true,
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'

  },
  withCredentials: false,
});



const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  withCredentials: false,
});



export const scrapeWikiUrl = async params => {
    const result = await apiClient.post(`/api/webscrape/`, params)
    //console.log("IN API, scrape result:", result.data)
    return result.data
};



export const fetchEnergizers = async () => {
    const result = await apiClient.get(`/api/energizers/`);
    return result.data.data
};


  export const createEnergizer = async params => {
    return apiClient.post('/api/energizers/create', params);
  };

  export const updateEnergizer = async params => {
    return apiClient.post('/api/energizers/update', params);
  };


  export const scrapeWikiUrlClient = async (energizer) => {
      const result = await webClient.get('https://en.wikipedia.org/wiki/Danielle_Brooks',
      {     crossDomain:true,
        		method: 'HEAD',
        		mode: 'no-cors',
      });
      console.log("IN API, result:", result.data)
      return result.data.data
  };
