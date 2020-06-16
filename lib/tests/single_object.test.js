"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _jsonapi = require("../jsonapi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var standardHeaders = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  Authorization: 'Bearer API_TOKEN'
};

var _api = new _jsonapi.JsonApi({
  host: 'https://rest.api.transifex.com',
  auth: 'API_TOKEN'
});

var Foo = /*#__PURE__*/function (_Resource) {
  _inherits(Foo, _Resource);

  var _super = _createSuper(Foo);

  function Foo() {
    var _this;

    _classCallCheck(this, Foo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "TYPE", 'foos');

    return _this;
  }

  return Foo;
}(_jsonapi.Resource);

_api.register(Foo);

jest.mock('axios');
test('Make some new objects', function () {
  var foo = new Foo({
    id: '1',
    attributes: {
      name: 'Joe'
    }
  });
  expect(foo.attributes).toEqual({
    name: 'Joe'
  });
  expect(foo.get('name')).toBe('Joe');
  var castor = new Foo({
    id: '1',
    attributes: {
      name: 'Castor'
    }
  });
  var pollux = new Foo({
    id: '2',
    attributes: {
      name: 'Pollux'
    },
    relationships: {
      brother: castor
    }
  });
  expect(pollux.relationships).toEqual({
    brother: {
      data: {
        type: 'foos',
        id: '1'
      }
    }
  });
  expect(pollux.related).toEqual({
    brother: castor
  });
  expect(pollux.get('brother')).toEqual(castor);
  castor = new Foo({
    id: '1',
    attributes: {
      name: 'Castor'
    }
  });
  pollux = new Foo({
    id: '2',
    attributes: {
      name: 'Pollux'
    },
    relationships: {
      brother: {
        data: {
          type: 'foos',
          id: '1'
        },
        links: {
          related: '/foos/2/brother',
          self: '/foos/2/relationships/brother'
        }
      }
    }
  });
  expect(pollux.relationships).toEqual({
    brother: {
      data: {
        type: 'foos',
        id: '1'
      },
      links: {
        related: '/foos/2/brother',
        self: '/foos/2/relationships/brother'
      }
    }
  });
  expect(pollux.related.brother.id).toBe('1');
  expect(pollux.get('brother').id).toBe('1');
});
test('Foo.get() returns an instance', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var foo;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  hello: 'world'
                }
              }
            }
          }));

          _context.next = 3;
          return Foo.get('1');

        case 3:
          foo = _context.sent;
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'get',
            url: 'https://rest.api.transifex.com/foos/1',
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(foo.id).toBe('1');
          expect(foo.attributes).toEqual({
            hello: 'world'
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('foo.reload() fetches all the data', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var foo;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  hello: 'world'
                }
              }
            }
          }));

          foo = new Foo({
            id: 1
          });
          _context2.next = 4;
          return foo.reload();

        case 4:
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'get',
            url: 'https://rest.api.transifex.com/foos/1',
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(foo.id).toBe('1');
          expect(foo.attributes).toEqual({
            hello: 'world'
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('Resource.new() returns appropriate class', function () {
  var foo = _api["new"]({
    type: 'foos',
    id: '1'
  });

  expect(foo).toBeInstanceOf(Foo);
});
test('Save existing', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var foo;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'Bob',
                  last_update: 'now'
                }
              }
            }
          }));

          foo = new Foo({
            id: '1',
            attributes: {
              name: 'Bob'
            }
          });
          _context3.next = 4;
          return foo.save('name');

        case 4:
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'patch',
            url: 'https://rest.api.transifex.com/foos/1',
            headers: standardHeaders,
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'Bob'
                }
              }
            },
            maxRedirects: 0
          });
          expect(foo.get('last_update')).toBe('now');

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('Save new', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var foo;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'Bob',
                  created_at: 'now'
                }
              }
            }
          }));

          foo = new Foo({
            attributes: {
              name: 'Bob'
            }
          });
          _context4.next = 4;
          return foo.save();

        case 4:
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'post',
            url: 'https://rest.api.transifex.com/foos',
            headers: standardHeaders,
            data: {
              data: {
                type: 'foos',
                attributes: {
                  name: 'Bob'
                }
              }
            },
            maxRedirects: 0
          });
          expect(foo.id).toBe('1');
          expect(foo.attributes).toEqual({
            name: 'Bob',
            created_at: 'now'
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('Create', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var foo;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: {
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'Bob',
                  created_at: 'now'
                }
              }
            }
          }));

          _context5.next = 3;
          return Foo.create({
            attributes: {
              name: 'Bob'
            }
          });

        case 3:
          foo = _context5.sent;
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'post',
            url: 'https://rest.api.transifex.com/foos',
            headers: standardHeaders,
            data: {
              data: {
                type: 'foos',
                attributes: {
                  name: 'Bob'
                }
              }
            },
            maxRedirects: 0
          });
          expect(foo.id).toBe('1');
          expect(foo.attributes).toEqual({
            name: 'Bob',
            created_at: 'now'
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('Delete', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var foo;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({}));

          foo = new Foo({
            id: '1',
            attributes: {
              name: 'Bob'
            }
          });
          _context6.next = 4;
          return foo["delete"]();

        case 4:
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'delete',
            url: 'https://rest.api.transifex.com/foos/1',
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(foo.id).toBe(null);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));