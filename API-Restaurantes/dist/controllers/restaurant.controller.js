"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRestaurant = createRestaurant;
exports.getRestaurants = getRestaurants;
exports.getOneRestaurant = getOneRestaurant;
exports.deleteRestaurant = deleteRestaurant;
exports.updateRestaurant = updateRestaurant;

var _Restaurant = _interopRequireDefault(require("../models/Restaurant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createRestaurant(_x, _x2) {
  return _createRestaurant.apply(this, arguments);
}

function _createRestaurant() {
  _createRestaurant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, restaurant_name, address, bussiness_name, rfc, postal_code, city, state, phone, opening_time, contact_name, newRestaurant;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, restaurant_name = _req$body.restaurant_name, address = _req$body.address, bussiness_name = _req$body.bussiness_name, rfc = _req$body.rfc, postal_code = _req$body.postal_code, city = _req$body.city, state = _req$body.state, phone = _req$body.phone, opening_time = _req$body.opening_time, contact_name = _req$body.contact_name;
            _context.prev = 2;
            _context.next = 5;
            return _Restaurant["default"].create({
              restaurant_name: restaurant_name,
              address: address,
              bussiness_name: bussiness_name,
              rfc: rfc,
              postal_code: postal_code,
              city: city,
              state: state,
              phone: phone,
              opening_time: opening_time,
              contact_name: contact_name
            }, {
              fields: ['restaurant_name', 'address', 'bussiness_name', 'rfc', 'postal_code', 'city', 'state', 'phone', 'opening_time', 'contact_name']
            });

          case 5:
            newRestaurant = _context.sent;

            if (!newRestaurant) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Restaurant created succesfully',
              data: newRestaurant
            }));

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Algo ha salido mal',
              data: {}
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createRestaurant.apply(this, arguments);
}

function getRestaurants(_x3, _x4) {
  return _getRestaurants.apply(this, arguments);
}

function _getRestaurants() {
  _getRestaurants = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var restaurants;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Restaurant["default"].findAll();

          case 3:
            restaurants = _context2.sent;
            res.json({
              data: restaurants
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getRestaurants.apply(this, arguments);
}

function getOneRestaurant(_x5, _x6) {
  return _getOneRestaurant.apply(this, arguments);
}

function _getOneRestaurant() {
  _getOneRestaurant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, restaurant;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _Restaurant["default"].findOne({
              where: {
                id: id
              }
            });

          case 3:
            restaurant = _context3.sent;
            res.json({
              data: restaurant
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOneRestaurant.apply(this, arguments);
}

function deleteRestaurant(_x7, _x8) {
  return _deleteRestaurant.apply(this, arguments);
}

function _deleteRestaurant() {
  _deleteRestaurant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, deleteRowCount;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _Restaurant["default"].destroy({
              where: {
                id: id
              }
            });

          case 3:
            deleteRowCount = _context4.sent;
            res.json({
              message: 'Restaurant deleted succesfully',
              count: deleteRowCount
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteRestaurant.apply(this, arguments);
}

function updateRestaurant(_x9, _x10) {
  return _updateRestaurant.apply(this, arguments);
}

function _updateRestaurant() {
  _updateRestaurant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, restaurant_name, address, bussiness_name, rfc, postal_code, city, state, phone, opening_time, contact_name, restaurants;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, restaurant_name = _req$body2.restaurant_name, address = _req$body2.address, bussiness_name = _req$body2.bussiness_name, rfc = _req$body2.rfc, postal_code = _req$body2.postal_code, city = _req$body2.city, state = _req$body2.state, phone = _req$body2.phone, opening_time = _req$body2.opening_time, contact_name = _req$body2.contact_name;
            _context6.next = 4;
            return _Restaurant["default"].findAll({
              fields: ['id', 'restaurant_name', 'address', 'bussiness_name', 'rfc', 'postal_code', 'city', 'state', 'phone', 'opening_time', 'contact_name'],
              where: {
                id: id
              }
            });

          case 4:
            restaurants = _context6.sent;

            if (!(restaurants.length > 0)) {
              _context6.next = 9;
              break;
            }

            restaurants.forEach(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(restaurant) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return restaurant.update({
                          restaurant_name: restaurant_name,
                          address: address,
                          bussiness_name: bussiness_name,
                          rfc: rfc,
                          postal_code: postal_code,
                          city: city,
                          state: state,
                          phone: phone,
                          opening_time: opening_time,
                          contact_name: contact_name
                        });

                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x11) {
                return _ref.apply(this, arguments);
              };
            }());
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.json({
              message: 'Restaurant does not exists'
            }));

          case 10:
            return _context6.abrupt("return", res.json({
              message: 'Restaurant updated successfully',
              data: restaurants
            }));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _updateRestaurant.apply(this, arguments);
}