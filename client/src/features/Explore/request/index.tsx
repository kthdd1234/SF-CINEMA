import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});
