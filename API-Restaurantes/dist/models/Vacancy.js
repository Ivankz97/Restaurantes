"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Vacancy = _database.sequilize.define('vacancy', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  time: {
    type: _sequelize["default"].INTEGER
  },
  id_payment: {
    type: _sequelize["default"].INTEGER
  },
  benefits: {
    type: _sequelize["default"].TEXT
  },
  validity_post: {
    type: _sequelize["default"].INTEGER
  },
  restaurant_id: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false
});

var _default = Vacancy;
exports["default"] = _default;