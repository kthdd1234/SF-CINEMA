import axios from 'axios';
import { getMovie } from './getMovie';
import { likeCancel } from './likeCancel';
import { likeCompleted } from './likeCompleted';
import { saveCancel } from './saveCancel';
import { saveCompleted } from './saveCompleted';

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

export {
   serverUrl,
   getMovie,
   likeCancel,
   likeCompleted,
   saveCancel,
   saveCompleted,
};
