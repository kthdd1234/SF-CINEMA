import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
   isLogin: boolean;
   profile: object;
}

const initialState: AuthState = {
   isLogin: false,
   profile: {},
};

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
});

export const { setIsLogin, setProfile } = authSlice.actions;
export default authSlice.reducer;
