import axios from 'axios';
import { backdrop } from './backdrop';
import { login } from './login';
import { signup } from './signup';
import dotenv from 'dotenv';
dotenv.config()

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

export { serverUrl, backdrop, login, signup };
