"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _vacancy = require("../controllers/vacancy.controller");

var router = (0, _express.Router)();
router.post('/', _vacancy.createVacancy);
router.get('/', _vacancy.getVacancies);
router.put('/:id', _vacancy.updateVacancy);
router["delete"]('/:id', _vacancy.deleteVacancy);
router.get('/:id', _vacancy.getOneVacancy);
router.get('/restaurant/:restaurant_id', _vacancy.getVacancyByRestaurant);
var _default = router;
exports["default"] = _default;