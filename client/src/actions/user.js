/* Action types */
export const SET_ISLOGIN = 'SET_ISLOGIN';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_LOGINID = 'SET_LOGINID';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_CONFIRMPASSWORD = 'SET_CONFIRMPASSWORD';
export const SET_USERNAME = 'SET_USERNAME';

/* Action creators */
export const setIsLogin = (isLogin) => ({
   type: SET_ISLOGIN,
   isLogin: isLogin,
});

export const setProfile = (profile) => ({
   type: SET_PROFILE,
   profile: profile,
});

export const setLoginID = (loginID) => ({
   type: SET_LOGINID,
   loginID: loginID,
});

export const setPassword = (password) => ({
   type: SET_PASSWORD,
   password: password,
});

export const setConfirmPassword = (confirmPassword) => ({
   type: SET_CONFIRMPASSWORD,
   confirmPassword: confirmPassword,
});

export const setUsername = (username) => ({
   type: SET_USERNAME,
   username: username,
});

// 여기서 () => ({}) 은, function() { return { } } 와 동일한 의미
