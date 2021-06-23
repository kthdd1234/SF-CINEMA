import axios from 'axios';

export const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});
