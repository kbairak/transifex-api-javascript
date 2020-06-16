"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen["return"] !== "function") { this["return"] = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype["throw"] = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype["return"] = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

var Queryset = /*#__PURE__*/function () {
  function Queryset(API, url, params) {
    _classCallCheck(this, Queryset);

    this.API = API;
    this.url = url;
    this.params = params || {};
    this.data = null;
    this.length = null;
    this._nextUrl = null;
    this._previousUrl = null;
  }

  _createClass(Queryset, [{
    key: "evaluate",
    value: function () {
      var _evaluate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var responseBody;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.data) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return this.API.request({
                  method: 'get',
                  url: this.url,
                  params: this.params
                });

              case 4:
                responseBody = _context.sent;
                this.data = _lodash["default"].map(responseBody.data, function (item) {
                  return _this3.API["new"](item);
                });
                this._nextUrl = (responseBody.links || {}).next || null;
                this._previousUrl = (responseBody.links || {}).previous || null;
                this.length = this.data.length;
                return _context.abrupt("return", this);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function evaluate() {
        return _evaluate.apply(this, arguments);
      }

      return evaluate;
    }()
  }, {
    key: "hasNext",
    value: function hasNext() {
      this.evaluate();
      return !!this._nextUrl;
    }
  }, {
    key: "next",
    value: function next() {
      this.evaluate();
      return new Queryset(this.API, this._nextUrl, this.params);
    }
  }, {
    key: "hasPrevious",
    value: function hasPrevious() {
      this.evaluate();
      return !!this._previousUrl;
    }
  }, {
    key: "previous",
    value: function previous() {
      this.evaluate();
      return new Queryset(this.API, this._previousUrl, this.params);
    }
  }, {
    key: "filter",
    value: function filter(filters) {
      var Resource = require('./resources')["default"];

      var params = Object.assign({}, this.params);

      for (var _i = 0, _Object$entries = Object.entries(filters); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var new_key = 'filter';

        var _iterator = _createForOfIteratorHelper(key.split('__')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var part = _step.value;
            new_key += "[".concat(part, "]");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (value instanceof Resource) {
          value = value.id;
        }

        params[new_key] = value;
      }

      return new Queryset(this.API, this.url, params);
    }
  }, {
    key: "all_pages",
    value: function all_pages() {
      var _this = this;

      return _wrapAsyncGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var page;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _awaitAsyncGenerator(_this.evaluate());

              case 2:
                if (!_this.length) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 5;
                return _this;

              case 5:
                page = _this;

              case 6:
                if (!page.hasNext()) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 9;
                return _awaitAsyncGenerator(page.next().evaluate());

              case 9:
                page = _context2.sent;
                _context2.next = 12;
                return page;

              case 12:
                _context2.next = 6;
                break;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }, {
    key: "all",
    value: function all() {
      var _this2 = this;

      return _wrapAsyncGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _iterator2, _step2, page, _iterator3, _step3, item;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator2 = _createForOfIteratorHelper(_this2.all_pages());
                _context3.prev = 1;

                _iterator2.s();

              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 24;
                  break;
                }

                page = _step2.value;
                _iterator3 = _createForOfIteratorHelper(page.data);
                _context3.prev = 6;

                _iterator3.s();

              case 8:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 14;
                  break;
                }

                item = _step3.value;
                _context3.next = 12;
                return item;

              case 12:
                _context3.next = 8;
                break;

              case 14:
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](6);

                _iterator3.e(_context3.t0);

              case 19:
                _context3.prev = 19;

                _iterator3.f();

                return _context3.finish(19);

              case 22:
                _context3.next = 3;
                break;

              case 24:
                _context3.next = 29;
                break;

              case 26:
                _context3.prev = 26;
                _context3.t1 = _context3["catch"](1);

                _iterator2.e(_context3.t1);

              case 29:
                _context3.prev = 29;

                _iterator2.f();

                return _context3.finish(29);

              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 26, 29, 32], [6, 16, 19, 22]]);
      }))();
    }
  }]);

  return Queryset;
}();

exports["default"] = Queryset;