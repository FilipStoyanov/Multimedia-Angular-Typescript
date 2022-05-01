"use strict";
exports.__esModule = true;
exports.imageReducer = exports.initialState = void 0;
var store_1 = require("@ngrx/store");
var image_actions_1 = require("../actions/image.actions");
exports.initialState = {
    username: '',
    data: ''
};
exports.imageReducer = store_1.createReducer(exports.initialState, store_1.on(image_actions_1.addImage, function (state, action) {
    return {
        username: action.image.username,
        data: action.image.data
    };
}));
