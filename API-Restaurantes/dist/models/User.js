"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _database.sequilize.define('user', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: {
    type: _sequelize["default"].TEXT
  },
  last_name: {
    type: _sequelize["default"].TEXT
  },
  e_mail: {
    type: _sequelize["default"].TEXT
  },
  password: {
    type: _sequelize["default"].TEXT
  },
  phone: {
    type: _sequelize["default"].TEXT
  },
  postal_code: {
    type: _sequelize["default"].INTEGER
  },
  experience: {
    type: _sequelize["default"].TEXT
  },
  token: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false
});

var _default = User;
exports["default"] = _default;