"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

    _defineProperty(_assertThisInitialized(_this), "TYPE", "foos");

    return _this;
  }

  return Foo;
}(_jsonapi.Resource);

_api.register(Foo);

jest.mock('axios');
test('List', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var qs;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: [{
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'One'
                }
              }, {
                type: 'foos',
                id: '2',
                attributes: {
                  name: 'Two'
                }
              }],
              links: {
                next: '/foos?page=2'
              }
            }
          }));

          _context.next = 3;
          return Foo.list().evaluate();

        case 3:
          qs = _context.sent;
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'get',
            url: 'https://rest.api.transifex.com/foos',
            params: {},
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(qs.data[0].id).toBe('1');
          expect(qs.data[0].attributes).toEqual({
            name: 'One'
          });
          expect(qs.data[1].id).toBe('2');
          expect(qs.data[1].attributes).toEqual({
            name: 'Two'
          });
          expect(qs.hasNext()).toBe(true);
          expect(qs.hasPrevious()).toBe(false);

          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: [{
                type: 'foos',
                id: '3',
                attributes: {
                  name: 'Three'
                }
              }, {
                type: 'foos',
                id: '4',
                attributes: {
                  name: 'Four'
                }
              }],
              links: {
                previous: '/foos?page=1'
              }
            }
          }));

          _context.next = 14;
          return qs.next().evaluate();

        case 14:
          qs = _context.sent;
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'get',
            url: 'https://rest.api.transifex.com/foos?page=2',
            params: {},
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(qs.data[0].id).toBe('3');
          expect(qs.data[0].attributes).toEqual({
            name: 'Three'
          });
          expect(qs.data[1].id).toBe('4');
          expect(qs.data[1].attributes).toEqual({
            name: 'Four'
          });
          expect(qs.hasNext()).toBe(false);
          expect(qs.hasPrevious()).toBe(true);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('Filters', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var qs;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _axios["default"].request.mockResolvedValue(Promise.resolve({
            data: {
              data: [{
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'One'
                }
              }, {
                type: 'foos',
                id: '3',
                attributes: {
                  name: 'Three'
                }
              }]
            }
          }));

          _context2.next = 3;
          return Foo.list().filter({
            kind: 'odd'
          }).evaluate();

        case 3:
          qs = _context2.sent;
          expect(_lodash["default"].last(_axios["default"].request.mock.calls)[0]).toEqual({
            method: 'get',
            url: 'https://rest.api.transifex.com/foos',
            params: {
              'filter[kind]': 'odd'
            },
            headers: standardHeaders,
            maxRedirects: 0
          });
          expect(qs.data[0].id).toBe('1');
          expect(qs.data[0].attributes).toEqual({
            name: 'One'
          });
          expect(qs.data[1].id).toBe('3');
          expect(qs.data[1].attributes).toEqual({
            name: 'Three'
          });
          expect(qs.hasNext()).toBe(false);
          expect(qs.hasPrevious()).toBe(false);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('Pagination', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var qs, result, _iterator, _step, item;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _axios["default"].request.mockResolvedValueOnce(Promise.resolve({
            data: {
              data: [{
                type: 'foos',
                id: '1',
                attributes: {
                  name: 'One'
                }
              }, {
                type: 'foos',
                id: '2',
                attributes: {
                  name: 'Two'
                }
              }],
              links: {
                next: '/foos?page=2'
              }
            }
          })).mockResolvedValueOnce(Promise.resolve({
            data: {
              data: [{
                type: 'foos',
                id: '3',
                attributes: {
                  name: 'Three'
                }
              }, {
                type: 'foos',
                id: '4',
                attributes: {
                  name: 'Four'
                }
              }],
              links: {
                previous: '/foos?page=1'
              }
            }
          }));

          qs = Foo.list();
          result = [];
          _iterator = _createForOfIteratorHelper(qs.all());

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              item = _step.value;
              result.push([item.id, item.get('name')]);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          expect(result).toEqual([[1, 'One'], [2, 'Two'], [3, 'Three'], [4, 'Four']]);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));