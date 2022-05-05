"use strict";
exports.__esModule = true;
exports.addFriendList = exports.addUser = void 0;
var store_1 = require("@ngrx/store");
exports.addUser = store_1.createAction('addUser', store_1.props());
exports.addFriendList = store_1.createAction('addFriends', store_1.props());
