/* Action types */
export const SET_ISLOGIN = 'SET_ISLOGIN';
export const SET_PROFILE = 'SET_PROFILE';

/* Action creators */
export const setIsLogin = (isLogin: boolean) => ({
   type: SET_ISLOGIN,
   isLogin: isLogin,
});

export const setProfile = (profile: object) => ({
   type: SET_PROFILE,
   profile: profile,
});

// 여기서 () => ({}) 은, function() { return { } } 와 동일한 의미
