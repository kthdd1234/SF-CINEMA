import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../components/Auth/authSlice';

export default configureStore({
   reducer: {
      auth: authSlice,
   },
});
