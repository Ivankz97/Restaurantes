"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Vacancy = _interopRequireDefault(require("./Vacancy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Restaurant = _database.sequilize.define('restaurants', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  restaurant_name: {
    type: _sequelize["default"].TEXT
  },
  address: {
    type: _sequelize["default"].TEXT
  },
  bussiness_name: {
    type: _sequelize["default"].TEXT
  },
  rfc: {
    type: _sequelize["default"].TEXT
  },
  postal_code: {
    type: _sequelize["default"].INTEGER
  },
  city: {
    type: _sequelize["default"].TEXT
  },
  state: {
    type: _sequelize["default"].TEXT
  },
  phone: {
    type: _sequelize["default"].TEXT
  },
  opening_time: {
    type: _sequelize["default"].TEXT
  },
  contact_name: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false
});

Restaurant.hasMany(_Vacancy["default"], {
  foreignKey: 'restaurant_id',
  sourceKey: 'id'
});

_Vacancy["default"].belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  sourceKey: 'id'
});

var _default = Restaurant;
exports["default"] = _default;