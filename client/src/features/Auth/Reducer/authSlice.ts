import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

interface AuthState {
   isLogin: boolean;
   profile: object;
   loginStatus: string;
   signUpStatus: string;
}

interface IUserData {
   loginID?: string;
   password?: string;
}

const initialState: AuthState = {
   isLogin: false,
   profile: {},
   loginStatus: 'idle',
   signUpStatus: 'idle',
};

const baseURL = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

export const loginAsync = createAsyncThunk(
   'login/fetchLogin',
   async ({ loginID, password }: IUserData) => {
      const { data } = await baseURL.post('/user/login', {
         loginID: loginID,
         password: password,
      });
      return data;
   },
);

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsLogin: (state, action: PayloadAction<boolean>) => {
         state.isLogin = action.payload;
      },
      setProfile: (state, action: PayloadAction<object>) => {
         state.profile = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginAsync.pending, (state) => {
            state.loginStatus = 'loading';
         })
         .addCase(loginAsync.fulfilled, (state) => {
            state.loginStatus = 'success';
         })
         .addCase(loginAsync.rejected, (state) => {
            state.loginStatus = 'error';
         });
   },
});

export const { setIsLogin, setProfile } = authSlice.actions;
export default authSlice.reducer;
