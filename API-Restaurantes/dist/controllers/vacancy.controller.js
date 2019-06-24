"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVacancy = createVacancy;
exports.getVacancies = getVacancies;
exports.updateVacancy = updateVacancy;
exports.deleteVacancy = deleteVacancy;
exports.getOneVacancy = getOneVacancy;
exports.getVacancyByRestaurant = getVacancyByRestaurant;

var _Vacancy = _interopRequireDefault(require("../models/Vacancy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createVacancy(_x, _x2) {
  return _createVacancy.apply(this, arguments);
}

function _createVacancy() {
  _createVacancy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, time, id_payment, benefits, validity_post, restaurant_id, newVacancy;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, time = _req$body.time, id_payment = _req$body.id_payment, benefits = _req$body.benefits, validity_post = _req$body.validity_post, restaurant_id = _req$body.restaurant_id;
            _context.next = 3;
            return _Vacancy["default"].create({
              time: time,
              id_payment: id_payment,
              benefits: benefits,
              validity_post: validity_post,
              restaurant_id: restaurant_id
            }, {
              fields: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id']
            });

          case 3:
            newVacancy = _context.sent;
            res.json({
              message: 'New vacancy created'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createVacancy.apply(this, arguments);
}

function getVacancies(_x3, _x4) {
  return _getVacancies.apply(this, arguments);
}

function _getVacancies() {
  _getVacancies = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var vacancies;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Vacancy["default"].findAll({
              fields: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
              order: [['id', 'DESC']]
            });

          case 2:
            vacancies = _context2.sent;
            res.json({
              vacancies: vacancies
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getVacancies.apply(this, arguments);
}

function updateVacancy(_x5, _x6) {
  return _updateVacancy.apply(this, arguments);
}

function _updateVacancy() {
  _updateVacancy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, _req$body2, time, id_payment, benefits, validity_post, restaurant_id, updatedVacancy;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, time = _req$body2.time, id_payment = _req$body2.id_payment, benefits = _req$body2.benefits, validity_post = _req$body2.validity_post, restaurant_id = _req$body2.restaurant_id;
            _context3.next = 4;
            return _Vacancy["default"].findOne({
              attributes: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
              where: {
                id: id
              }
            });

          case 4:
            _context3.next = 6;
            return _Vacancy["default"].update({
              time: time,
              id_payment: id_payment,
              benefits: benefits,
              validity_post: validity_post,
              restaurant_id: restaurant_id
            }, {
              where: {
                id: id
              }
            });

          case 6:
            updatedVacancy = _context3.sent;

            if (!(updatedVacancy == 0)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.json({
              message: 'Vacancy does not exists'
            }));

          case 11:
            res.json({
              message: 'Vacancy updated',
              updatedVacancy: updatedVacancy
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateVacancy.apply(this, arguments);
}

function deleteVacancy(_x7, _x8) {
  return _deleteVacancy.apply(this, arguments);
}

function _deleteVacancy() {
  _deleteVacancy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, deletedVacancy;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _Vacancy["default"].destroy({
              where: {
                id: id
              }
            });

          case 3:
            deletedVacancy = _context4.sent;

            if (!(deletedVacancy == 0)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'Vacancy does not exists'
            }));

          case 8:
            res.json({
              message: 'Vacancy deleted successfully'
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteVacancy.apply(this, arguments);
}

function getOneVacancy(_x9, _x10) {
  return _getOneVacancy.apply(this, arguments);
}

function _getOneVacancy() {
  _getOneVacancy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, vacancy;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _Vacancy["default"].findOne({
              where: {
                id: id
              }
            });

          case 3:
            vacancy = _context5.sent;
            res.json({
              vacancy: vacancy
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getOneVacancy.apply(this, arguments);
}

function getVacancyByRestaurant(_x11, _x12) {
  return _getVacancyByRestaurant.apply(this, arguments);
}

function _getVacancyByRestaurant() {
  _getVacancyByRestaurant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var restaurant_id, vacancies;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            restaurant_id = req.params.restaurant_id;
            _context6.next = 3;
            return _Vacancy["default"].findAll({
              attributes: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
              where: {
                restaurant_id: restaurant_id
              }
            });

          case 3:
            vacancies = _context6.sent;
            res.json({
              vacancies: vacancies
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getVacancyByRestaurant.apply(this, arguments);
}