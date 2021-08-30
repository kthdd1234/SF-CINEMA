import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLogin: false,
      profile: {},
   },
   reducers: {
      setIsLogin: (state) => {
         !state.isLogin;
      },
      setProfile: (state, action) => {
         action.payload;
      },
   },
});

export const { setIsLogin, setProfile } = authSlice.actions;
export default authSlice.reducer;
