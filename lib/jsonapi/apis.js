"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.starts-with");

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JsonApi = /*#__PURE__*/function () {
  function JsonApi(_ref) {
    var host = _ref.host,
        auth = _ref.auth;

    _classCallCheck(this, JsonApi);

    this.registry = {};
    this.setup({
      host: host,
      auth: auth
    });
  }

  _createClass(JsonApi, [{
    key: "setup",
    value: function setup(_ref2) {
      var host = _ref2.host,
          auth = _ref2.auth;

      if (host) {
        this.host = host;
      }

      if (auth) {
        if (typeof auth == 'string') {
          this.make_auth_headers = function () {
            return {
              Authorization: "Bearer ".concat(auth)
            };
          };
        } else {
          this.make_auth_headers = auth;
        }
      }
    }
  }, {
    key: "register",
    value: function register(klass) {
      var TYPE = new klass({}).TYPE;

      if (TYPE) {
        this.registry[TYPE] = klass;
      }

      klass.API = this;
      klass.prototype.API = this;
      return klass;
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var url, headers, kwargs, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _ref3.url, headers = _ref3.headers, kwargs = _objectWithoutProperties(_ref3, ["url", "headers"]);

                if (url.startsWith('/')) {
                  url = this.host + url;
                }

                if (!headers) {
                  headers = {};
                }

                Object.assign(headers, this.make_auth_headers(), {
                  Accept: 'application/vnd.api+json',
                  'Content-Type': 'application/vnd.api+json'
                });
                _context.next = 6;
                return _axios["default"].request(_objectSpread({
                  url: url,
                  headers: headers,
                  maxRedirects: 0
                }, kwargs));

              case 6:
                response = _context.sent;
                return _context.abrupt("return", response.data);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "new",
    value: function _new(data) {
      if ('data' in data) {
        data = data.data;
      }

      var klass = this.registry[data.type];
      return new klass(data);
    }
  }, {
    key: "asResource",
    value: function asResource(data) {
      try {
        return this["new"](data);
      } catch (error) {
        return data;
      }
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var id, type, include, instance;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref4.id, type = _ref4.type, include = _ref4.include;
                instance = this["new"]({
                  type: type,
                  id: id
                });
                instance.reload(include);
                return _context2.abrupt("return", instance);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return JsonApi;
}();

exports["default"] = JsonApi;