"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var reactjs_localstorage_1 = require("reactjs-localstorage");
var authSlice_1 = require("../../Auth/Reducer/authSlice");
var icons_1 = require("@ant-design/icons");
var Item_1 = require("./Item");
var SettingItems = function () {
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();
    var onClick = function () {
        reactjs_localstorage_1.reactLocalStorage.remove('SFCinemaUserToken');
        history.push('/');
        dispatch(authSlice_1.setIsLogin(false));
        dispatch(authSlice_1.setProfile({}));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Item_1["default"], { name: "\uD504\uB85C\uD544", icon: react_1["default"].createElement(icons_1.UserOutlined, null), onClick: function () { return history.push('/profile'); } }),
        react_1["default"].createElement(Item_1["default"], { name: "\uB85C\uADF8\uC544\uC6C3", icon: null, onClick: onClick })));
};
exports["default"] = SettingItems;
