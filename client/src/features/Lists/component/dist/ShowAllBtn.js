"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@ant-design/icons");
var ShowAllBtn = function (_a) {
    var path = _a.path;
    var history = react_router_dom_1.useHistory();
    return (react_1["default"].createElement("div", { className: "lists-head-btn", onClick: function () { return history.push("explore?" + path); } },
        "\uBAA8\uB450 \uBCF4\uAE30",
        react_1["default"].createElement(icons_1.DoubleRightOutlined, { className: "showall-icon" })));
};
exports["default"] = ShowAllBtn;
