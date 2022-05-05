"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.friendsReducer = exports.userReducer = exports.initialState = void 0;
var store_1 = require("@ngrx/store");
var user_actions_1 = require("../actions/user.actions");
exports.initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
    image: '',
    birthdate: '',
    role: 'user',
    friends: [],
    _id: ''
};
exports.userReducer = store_1.createReducer(exports.initialState, store_1.on(user_actions_1.addUser, function (state, action) {
    return {
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        email: action.user.email,
        password: action.user.password,
        username: action.user.username,
        image: action.user.image,
        _id: action.user._id,
        birthdate: action.user.birthdate
    };
}));
exports.friendsReducer = store_1.createReducer(exports.initialState, store_1.on(user_actions_1.addFriendList, function (state, action) { return (__assign(__assign({}, state), { friends: action.friends })); }));
