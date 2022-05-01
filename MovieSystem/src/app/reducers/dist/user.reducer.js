"use strict";
exports.__esModule = true;
exports.userReducer = exports.initialState = void 0;
var store_1 = require("@ngrx/store");
var user_actions_1 = require("../actions/user.actions");
exports.initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    image: ''
};
exports.userReducer = store_1.createReducer(exports.initialState, store_1.on(user_actions_1.addUser, function (state, action) {
    return {
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        password: action.user.password,
        username: action.user.username,
        image: action.user.image
    };
}));
