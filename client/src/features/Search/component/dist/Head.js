"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Icon_1 = require("./Icon");
var Sub_1 = require("./Sub");
var Head = function (_a) {
    var keyword = _a.keyword, len = _a.len;
    return (react_1["default"].createElement("div", { className: "search-head" },
        react_1["default"].createElement(Icon_1["default"], null),
        keyword,
        react_1["default"].createElement(Sub_1["default"], { sub: "\uAC80\uC0C9 \uACB0\uACFC" }),
        len,
        react_1["default"].createElement(Sub_1["default"], { sub: "\uAC74" })));
};
exports["default"] = Head;
