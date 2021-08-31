"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var icons_1 = require("@ant-design/icons");
var data_1 = require("./data");
var component_1 = require("./component");
require("./Navbar.css");
var Navbar = function () {
    var _a = react_1.useState(false), pushHover = _a[0], onPushHover = _a[1];
    var _b = react_1.useState(false), tagHover = _b[0], onTagHover = _b[1];
    var _c = react_1.useState(false), seriesHover = _c[0], onSeriesHover = _c[1];
    var _d = react_1.useState(false), search = _d[0], onSearch = _d[1];
    var exploreItems = [
        {
            onHover: onPushHover,
            value: '추천',
            icon: react_1["default"].createElement(icons_1.GiftOutlined, null),
            query: 'push',
            lists: data_1.pushList,
            hover: pushHover
        },
        {
            onHover: onTagHover,
            value: '특징',
            icon: react_1["default"].createElement(icons_1.TagOutlined, null),
            query: 'tag',
            lists: data_1.tagList,
            hover: tagHover
        },
        {
            onHover: onSeriesHover,
            value: '시리즈',
            icon: react_1["default"].createElement(icons_1.ThunderboltFilled, null),
            query: 'series',
            lists: data_1.seriesList,
            hover: seriesHover
        },
    ];
    var isLogin = react_redux_1.useSelector(function (state) { return state.auth.isLogin; });
    console.log('navbar state: ', isLogin);
    react_1.useEffect(function () {
        var navbar = window.document.querySelector('.nav');
        window.addEventListener('scroll', function () {
            var scrollTop = window.pageYOffset;
            if (navbar) {
                var style = navbar.style;
                if (scrollTop == 0) {
                    style.backgroundColor = 'transparent';
                }
                else {
                    style.backgroundColor = 'rgb(3, 7, 8)';
                }
            }
        });
    }, []);
    return (react_1["default"].createElement("nav", { className: "nav" },
        react_1["default"].createElement("div", { className: "nav-list" },
            react_1["default"].createElement(component_1.Logo, null),
            react_1["default"].createElement(component_1.HomeItem, null),
            exploreItems.map(function (_a, itemsIdx) {
                var onHover = _a.onHover, value = _a.value, icon = _a.icon, query = _a.query, lists = _a.lists, hover = _a.hover;
                return (react_1["default"].createElement(component_1.ExploreItem, { key: itemsIdx, onHover: onHover, value: value, icon: icon, query: query, lists: lists, hover: hover }));
            })),
        react_1["default"].createElement("div", { className: "nav-list" },
            react_1["default"].createElement(component_1.SearchItem, { search: search, onSearch: onSearch }),
            !isLogin ? react_1["default"].createElement(component_1.AuthItems, null) : react_1["default"].createElement(component_1.SettingItems, null))));
};
exports["default"] = Navbar;
