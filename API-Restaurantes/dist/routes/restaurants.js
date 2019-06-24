"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _restaurant = require("../controllers/restaurant.controller");

var router = (0, _express.Router)(); // api/restaurants

router.post('/new-restaurant', _restaurant.createRestaurant);
router.get('/', _restaurant.getRestaurants);
router.get('/:id', _restaurant.getOneRestaurant);
router["delete"]('/:id', _restaurant.deleteRestaurant);
router.put('/:id', _restaurant.updateRestaurant);
var _default = router;
exports["default"] = _default;