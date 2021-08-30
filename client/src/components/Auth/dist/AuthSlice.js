"use strict";
var _a;
exports.__esModule = true;
exports.setProfile = exports.setIsLogin = exports.authSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.authSlice = toolkit_1.createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        profile: {}
    },
    reducers: {
        setIsLogin: function (state) {
            !state.isLogin;
        },
        setProfile: function (state, action) {
            action.payload;
        }
    }
});
exports.setIsLogin = (_a = exports.authSlice.actions, _a.setIsLogin), exports.setProfile = _a.setProfile;
exports["default"] = exports.authSlice.reducer;
