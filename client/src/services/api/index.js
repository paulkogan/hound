import axios from 'axios';


let apiBaseURL = process.env.REACT_APP_API_BASE_URL
//console.log("IN API, backEnd_BaseURL is:", apiBaseURL)



const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  withCredentials: false,
});


export const readUploadList= async params => {

  const postConfig = {
    headers: { 'content-type': 'multipart/form-data' }
}

  console.log("IN API, sending the upload:", params)
  const result = await apiClient.post(`/api/uploadlist/`,params, postConfig)
  //console.log("IN API, list upload result:", result.data)
  return result.data
};



export const scrapeWikiUrl = async params => {
    console.log("IN API, scrape request:", params)
    const result = await apiClient.post(`/api/webscrape/`, params)
    console.log("IN API, scrape result:", result.data)
    return result.data.wikiFound
};



export const fetchEnergizers = async () => {
    const result = await apiClient.get(`/api/energizers/`);
    //console.log(result.data.data[0])
    return result.data.data
};


  export const createEnergizer = async params => {
    return apiClient.post('/api/energizers/create', params);
  };

  export const updateEnergizer = async params => {
    return apiClient.post('/api/energizers/update', params);
  };

  export const deleteEnergizer = async params => {
    return apiClient.post('/api/energizers/delete', params);
  };
