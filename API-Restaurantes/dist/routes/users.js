"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var router = (0, _express.Router)();
router.post('/register', _user.newUser);
router.post('/login', _user.loginUser);
router.post('/logout', _user.logout);
router.get('/', _user.getUsers);
router.get('/:id', _user.getUser);
router["delete"]('/:id', _user.deleteUser);
router.put('/:id', _user.updateUser);
router.post('/forgot_password', _user.forgotPassword);
router.post('/reset_password', _user.resetPassword);
var _default = router;
exports["default"] = _default;