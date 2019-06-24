"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = newUser;
exports.loginUser = loginUser;
exports.logout = logout;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var crypto = require('crypto');

var email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: '',
    // Su correo de Gmail
    pass: '' // Contraseña de su correo

  }
}); // Controlador para crear nuevo usuario

function newUser(_x, _x2, _x3) {
  return _newUser.apply(this, arguments);
} // Controlador para el login


function _newUser() {
  _newUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var e_mail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e_mail = req.body.e_mail;
            _context.next = 3;
            return _User["default"].findOne({
              where: {
                e_mail: e_mail
              }
            }).then(function (admin) {
              if (admin) {
                return res.status(409).json({
                  message: "El usario ya se encuentra registrado"
                });
              } else {
                // Trata de encriptar la contraseña 
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                  if (err) {
                    return res.status(500).json({
                      error: err
                    });
                  } else {
                    try {
                      var _newUser2 = _User["default"].create({
                        name: req.body.name,
                        last_name: req.body.last_name,
                        e_mail: req.body.e_mail,
                        password: hash,
                        phone: req.body.phone,
                        postal_code: req.body.postal_code,
                        experience: req.body.experience
                      }, {
                        fields: ['name', 'last_name', 'e_mail', 'password', 'phone', 'postal_code', 'experience']
                      });

                      if (_newUser2) {
                        return res.json({
                          message: 'Usuario creado satisfactoriamente',
                          data: _newUser2
                        });
                      }
                    } catch (error) {
                      console.log(err);
                      res.status(500).json({
                        message: 'Something goes wrong',
                        data: {}
                      });
                    }
                  }
                });
              }
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _newUser.apply(this, arguments);
}

function loginUser(_x4, _x5, _x6) {
  return _loginUser.apply(this, arguments);
}

function _loginUser() {
  _loginUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var e_mail;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e_mail = req.body.e_mail;
            _context2.next = 3;
            return _User["default"].findOne({
              where: {
                e_mail: e_mail
              }
            }).then(function (user) {
              if (!user) {
                return res.status(401).json({
                  message: "El correo electronico o la contraseña son incorrectas"
                });
              } // Compara la contraseña ingresada con la almacenada en la base de datos


              bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                  return res.status(401).json({
                    message: "Auth fallida"
                  });
                }

                if (result) {
                  var token = jwt.sign({
                    userId: user.id,
                    e_mail: user.e_mail
                  }, "secretpassword", {
                    expiresIn: "1h"
                  });

                  token: token;

                  return res.status(200).json(token);
                  /*return res.status(200).json({
                      message: "Auth successful",
                      token: token
                  })*/
                }

                if (req.body.password != user.password) {
                  return res.status(401).json({
                    message: "El correo electronico o la contraseña son incorrectas"
                  });
                }
              });
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loginUser.apply(this, arguments);
}

function logout(_x7, _x8, _x9) {
  return _logout.apply(this, arguments);
} // Controlador para obtener todos los usuarios


function _logout() {
  _logout = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.accessToken) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.sendStatus(401));

          case 2:
            //return 401:unauthorized if accessToken is not present
            _User["default"].logout(req.accessToken.id, function (err) {
              if (err) return next(err);
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _logout.apply(this, arguments);
}

function getUsers(_x10, _x11) {
  return _getUsers.apply(this, arguments);
} // Controlador para obtener un usuario en especifico


function _getUsers() {
  _getUsers = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _User["default"].findAll();

          case 3:
            users = _context4.sent;
            res.json({
              data: users
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _getUsers.apply(this, arguments);
}

function getUser(_x12, _x13) {
  return _getUser.apply(this, arguments);
} // Controlador para borrar un usuario


function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _User["default"].findOne({
              where: {
                id: id
              }
            });

          case 4:
            user = _context5.sent;
            res.json({
              data: user
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _getUser.apply(this, arguments);
}

function deleteUser(_x14, _x15) {
  return _deleteUser.apply(this, arguments);
} // Controlador para actualizar un usuario


function _deleteUser() {
  _deleteUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _User["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            user = _context6.sent;
            res.json({
              message: 'User deleted succesfully',
              count: user
            });
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _deleteUser.apply(this, arguments);
}

function updateUser(_x16, _x17) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, _req$body, name, last_name, e_mail, password, phone, postal_code, experience, users;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _req$body = req.body, name = _req$body.name, last_name = _req$body.last_name, e_mail = _req$body.e_mail, password = _req$body.password, phone = _req$body.phone, postal_code = _req$body.postal_code, experience = _req$body.experience;
            _context8.next = 5;
            return _User["default"].findAll({
              attributes: ['id', 'name', 'last_name', 'e_mail', 'password', 'phone', 'postal_code', 'experience'],
              where: {
                id: id
              }
            });

          case 5:
            users = _context8.sent;

            if (!(users.length > 0)) {
              _context8.next = 10;
              break;
            }

            bcrypt.hash(req.body.password, 10, function (err, hash) {
              users.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee7(user) {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return user.update({
                            name: name,
                            last_name: last_name,
                            e_mail: e_mail,
                            password: hash,
                            phone: phone,
                            postal_code: postal_code,
                            experience: experience
                          });

                        case 2:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x23) {
                  return _ref.apply(this, arguments);
                };
              }());
              return res.json({
                message: 'User updated successfully',
                data: users
              });
            });
            _context8.next = 11;
            break;

          case 10:
            return _context8.abrupt("return", res.json({
              message: 'User does not exists',
              data: users
            }));

          case 11:
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return _updateUser.apply(this, arguments);
}

function forgotPassword(_x18, _x19) {
  return _forgotPassword.apply(this, arguments);
}

function _forgotPassword() {
  _forgotPassword = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var e_mail;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            e_mail = req.body.e_mail;
            _context9.prev = 1;
            _context9.next = 4;
            return _User["default"].findOne({
              where: {
                e_mail: e_mail
              }
            }).then(function (user) {
              if (user) {
                res.json({
                  message: 'Por favor, revise su correo'
                });
              } else {
                return res.json({
                  message: 'User does not exists'
                });
              }

              crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');

                if (user) {
                  user.update({
                    token: token
                  });
                  var data = {
                    to: user.e_mail,
                    from: email,
                    subject: 'Password help has arrived!',
                    text: "Sustituir contraseña",
                    html: "<h1>Entre al siguiente enlace para sustituir su contraseña:</h1> <p>http://localhost:3000/auth/reset_password?token=" + token + "</p>"
                  };
                  smtpTransport.sendMail(data, function (err) {
                    if (!err) {
                      return res.json({
                        message: 'Por favor, revise su correo'
                      });
                    } else {
                      return done(err);
                    }
                  });
                } else {
                  return res.json({
                    message: 'User does not exists'
                  });
                }
              });
            });

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 6]]);
  }));
  return _forgotPassword.apply(this, arguments);
}

function resetPassword(_x20, _x21, _x22) {
  return _resetPassword.apply(this, arguments);
}

function _resetPassword() {
  _resetPassword = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res, next) {
    var token;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            token = req.body.token;
            _context10.next = 3;
            return _User["default"].findOne({
              where: {
                token: token
              }
            }).then(function (user) {
              if (user) {
                if (req.body.newPassword === req.body.verifyPassword) {
                  bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                    if (err) {
                      return res.status(500).json({
                        error: err
                      });
                    } else {
                      user.password = hash;
                      user.update({
                        password: user.password,
                        token: 'undefined'
                      });

                      if (!hash) {
                        return res.status(422).send({
                          message: 'Ha ocurrido un problema, intentelo más tarde'
                        });
                      } else {
                        var data = {
                          to: user.e_mail,
                          from: email,
                          subject: 'Password Reset Confirmation',
                          text: "Sustituir contraseña",
                          context: {
                            name: user.name.split(' ')
                          }
                        };
                        smtpTransport.sendMail(data, function (err) {
                          if (!err) {
                            return res.json({
                              message: 'Password reset'
                            });
                          } else {
                            return done(err);
                          }
                        });
                      }
                    }
                  });
                } else {
                  return res.status(422).send({
                    message: 'Passwords do not match'
                  });
                }
              } else {
                return res.status(400).send({
                  message: 'Password reset token is invalid or has expired.'
                });
              }
            });

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _resetPassword.apply(this, arguments);
}

;