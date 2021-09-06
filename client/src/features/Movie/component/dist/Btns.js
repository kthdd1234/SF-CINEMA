"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var authSlice_1 = require("../../Auth/Reducer/authSlice");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Btn_1 = require("./Btn");
var request_1 = require("../request");
var Btns = function (_a) {
    var movieId = _a.movieId, setTrailer = _a.setTrailer;
    var classGray = 'movie-contents-btn color-gray';
    var classblue = 'movie-contents-btn color-blue';
    var _b = react_1.useState(false), savedFilled = _b[0], setSavedFilled = _b[1];
    var _c = react_1.useState(false), likedFilled = _c[0], setLikedFilled = _c[1];
    var _d = react_1.useState(classGray), likedClass = _d[0], setLikedClass = _d[1];
    var _e = react_1.useState(classGray), savedClass = _e[0], setSavedClass = _e[1];
    var _f = react_redux_1.useSelector(function (state) { return state.auth; }), isLogin = _f.isLogin, profile = _f.profile;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        if (isLogin) {
            var _a = profile || {}, likedMovie = _a.likedMovie, savedMovie = _a.savedMovie;
            var setting = [
                {
                    data: likedMovie,
                    setFilled: setLikedFilled,
                    setClass: setLikedClass
                },
                {
                    data: savedMovie,
                    setFilled: setSavedFilled,
                    setClass: setSavedClass
                },
            ];
            setting.forEach(function (_a) {
                var data = _a.data, setFilled = _a.setFilled, setClass = _a.setClass;
                data === null || data === void 0 ? void 0 : data.some(function (_a) {
                    var id = _a.id;
                    if (movieId === id) {
                        setFilled(true);
                        setClass(classblue);
                    }
                });
            });
        }
    }, [movieId, isLogin]);
    var setSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isLogin) return [3 /*break*/, 5];
                    id = (profile || {}).id;
                    if (!!savedFilled) return [3 /*break*/, 2];
                    return [4 /*yield*/, request_1.saveCompleted(id, movieId)];
                case 1:
                    data = _a.sent();
                    dispatch(authSlice_1.setProfile(data));
                    antd_1.message.success('저장하기 리스트에 추가하였습니다.');
                    setSavedClass(classblue);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, request_1.saveCancel(id, movieId)];
                case 3:
                    data = _a.sent();
                    dispatch(authSlice_1.setProfile(data));
                    antd_1.message.success('저장하기 리스트에서 제거하였습니다.');
                    setSavedClass(classGray);
                    _a.label = 4;
                case 4:
                    setSavedFilled(!savedFilled);
                    return [3 /*break*/, 6];
                case 5:
                    antd_1.message.warning('로그인을 하여 영화를 저장해보세요.');
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var setLike = function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isLogin) return [3 /*break*/, 5];
                    id = (profile || {}).id;
                    if (!!likedFilled) return [3 /*break*/, 2];
                    return [4 /*yield*/, request_1.likeCompleted(id, movieId)];
                case 1:
                    data = _a.sent();
                    dispatch(authSlice_1.setProfile(data));
                    antd_1.message.success('재밌어요 리스트에 추가하였습니다.');
                    setLikedClass(classblue);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, request_1.likeCancel(id, movieId)];
                case 3:
                    data = _a.sent();
                    dispatch(authSlice_1.setProfile(data));
                    antd_1.message.success('재밌어요 리스트에서 제거하였습니다.');
                    setLikedClass(classGray);
                    _a.label = 4;
                case 4:
                    setLikedFilled(!likedFilled);
                    return [3 /*break*/, 6];
                case 5:
                    antd_1.message.warning('로그인을 하여 영화를 평가해보세요.');
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var props = [
        {
            className: 'movie-contents-btn',
            icon: react_1["default"].createElement(icons_1.PlayCircleOutlined, null),
            onClick: setTrailer,
            value: '예고편 보기'
        },
        {
            className: likedClass,
            icon: likedFilled ? react_1["default"].createElement(icons_1.CheckOutlined, null) : react_1["default"].createElement(icons_1.LikeOutlined, null),
            onClick: setLike,
            value: '재밌어요'
        },
        {
            className: savedClass,
            icon: savedFilled ? react_1["default"].createElement(icons_1.CheckOutlined, null) : react_1["default"].createElement(icons_1.PushpinOutlined, null),
            onClick: setSave,
            value: '저장하기'
        },
    ];
    return (react_1["default"].createElement("div", null, props.map(function (_a, i) {
        var className = _a.className, icon = _a.icon, onClick = _a.onClick, value = _a.value;
        return (react_1["default"].createElement(Btn_1["default"], { key: i, className: className, icon: icon, onClick: onClick, value: value }));
    })));
};
exports["default"] = Btns;
