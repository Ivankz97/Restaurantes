"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _restaurants = _interopRequireDefault(require("./routes/restaurants"));

var _vacancies = _interopRequireDefault(require("./routes/vacancies"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// Importando routes
// Inicialización
var app = (0, _express["default"])(); // Middleware

app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)()); // Routes

app.use('/api/restaurants', _restaurants["default"]);
app.use('/api/vacancies', _vacancies["default"]);
app.use('/api/user', _users["default"]);
var _default = app;
exports["default"] = _default;