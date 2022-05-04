"use strict";
exports.__esModule = true;
exports.userReducer = exports.initialState = void 0;
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
