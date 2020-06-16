"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

var _ = _interopRequireWildcard(require("lodash"));

var _querysets = _interopRequireDefault(require("./querysets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Resource = /*#__PURE__*/function () {
  function Resource(data) {
    _classCallCheck(this, Resource);

    _defineProperty(this, "TYPE", null);

    _defineProperty(this, "EDITABLE", null);

    if ('data' in data) {
      data = data.data;
    }

    this._overwrite(data);
  }

  _createClass(Resource, [{
    key: "_overwrite",
    value: function _overwrite(_ref) {
      var id = _ref.id,
          attributes = _ref.attributes,
          relationships = _ref.relationships,
          links = _ref.links,
          kwargs = _objectWithoutProperties(_ref, ["id", "attributes", "relationships", "links"]);

      this.id = id || null;
      this.attributes = attributes || {};
      this.links = links || {};
      var _ref2 = [{}, {}];
      this.relationships = _ref2[0];
      this.related = _ref2[1];

      for (var _i = 0, _Object$entries = Object.entries(relationships || {}); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this._setRelationship(key, value);

        if (!this.relationships[key] || 'data' in this.relationships[key]) {
          this._setRelated(key, value);
        }
      } // TODO: included

    }
  }, {
    key: "_setRelationship",
    value: function _setRelationship(key, value) {
      if (value instanceof Resource) {
        this.relationships[key] = value.asRelationship();
      } else {
        if (value && _.isEqual(_.sortBy(Object.keys(value)), _.sortBy(['id', 'type']))) {
          value = {
            data: value
          };
        }

        if (!value || 'data' in value || 'links' in value) {
          // Resource identifier was passed
          this.relationships[key] = value;
        } else {
          throw "Invalid type '".concat(value, "' for relationship '").concat(key, "'");
        }
      }
    }
  }, {
    key: "_setRelated",
    value: function _setRelated(key, value) {
      if (!(key in this.relationships)) {
        throw "Cannot change relationship '".concat(key, "' because it's not an existing relationship");
      }

      if (this.relationships[key] && !('data' in this.relationships[key])) {
        throw "Cannot change relationship '".concat(key, "' because it's a plural relationship. Use .add()', '.remove()' or '.reset()' instead");
      }

      value = this.API.asResource(value);
      var fromNullToNotNull = !!(!this.relationships[key] && value);
      var fromNotNullToNull = !!(this.relationships[key] && !value);
      var dataChanged = !!(this.relationships[key] && value && !_.isEqual(this.relationships[key].data, value.asResourceIdentifier()));

      if (fromNullToNotNull || fromNullToNotNull || dataChanged) {
        if (value) {
          this.relationships[key] = null;
        } else {
          this.relationships[key] = value;
        }
      }

      this.related[key] = value;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (key in this.attributes) {
        return this.attributes[key];
      } else if (key in this.related) {
        return this.related[key];
      } else {
        return undefined;
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (key in this.attributes) {
        this.attributes[key] = value;
      } else if (key in this.relationships) {
        this._setRelated(key, value);
      } else {
        throw "'".concat(key, "' is not an attribute or relationship");
      }
    }
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url, responseBody;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.links.self || "/".concat(this.TYPE, "/").concat(this.id); // TODO: include

                _context.next = 3;
                return this.API.request({
                  method: 'get',
                  url: url
                });

              case 3:
                responseBody = _context.sent;

                // TODO: redirects
                this._overwrite(responseBody.data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var force,
            _len,
            relationshipNames,
            _key,
            last,
            _i2,
            _relationshipNames,
            relationshipName,
            relationship,
            isSingularFetched,
            isPluralFetched,
            url,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                force = false;

                for (_len = _args2.length, relationshipNames = new Array(_len), _key = 0; _key < _len; _key++) {
                  relationshipNames[_key] = _args2[_key];
                }

                last = relationshipNames[relationshipNames.length - 1];

                if (relationshipNames.length > 1 && !_.isString(last)) {
                  force = !!last.force;
                  relationshipNames.pop();
                }

                _i2 = 0, _relationshipNames = relationshipNames;

              case 5:
                if (!(_i2 < _relationshipNames.length)) {
                  _context2.next = 26;
                  break;
                }

                relationshipName = _relationshipNames[_i2];

                if (relationshipName in this.relationships) {
                  _context2.next = 9;
                  break;
                }

                throw "'".concat(relationshipName, "' is not a relationship");

              case 9:
                relationship = this.relationships[relationshipName];

                if (relationship) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("continue", 23);

              case 12:
                isSingularFetched = this.related[relationshipName] instanceof Resource && (_.size(this.related[relationshipName].attributes) || _.size(this.related[relationshipName].relationships));
                isPluralFetched = this.related[relationshipName] instanceof _querysets["default"];

                if (!((isSingularFetched || isPluralFetched) && !force)) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("continue", 23);

              case 16:
                if (!('data' in relationship)) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 19;
                return this.related[relationshipName].reload();

              case 19:
                _context2.next = 23;
                break;

              case 21:
                url = (relationship.links || {}).related || "/".concat(this.TYPE, "/").concat(this.id, "/").concat(relationshipName);
                this.related[relationshipName] = new _querysets["default"](this.API, url);

              case 23:
                _i2++;
                _context2.next = 5;
                break;

              case 26:
                if (!(relationshipNames.length == 1)) {
                  _context2.next = 28;
                  break;
                }

                return _context2.abrupt("return", this.related[relationshipNames[0]]);

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetch() {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var responseBody,
            data,
            related,
            _i3,
            _Object$entries2,
            _Object$entries2$_i,
            relationshipName,
            relatedInstance,
            currentId,
            newId,
            relationships,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.id) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this._saveExisting.apply(this, _args3);

              case 3:
                responseBody = _context3.sent;
                _context3.next = 9;
                break;

              case 6:
                _context3.next = 8;
                return this._saveNew.apply(this, _args3);

              case 8:
                responseBody = _context3.sent;

              case 9:
                data = responseBody.data;
                related = Object.assign({}, this.related);
                _i3 = 0, _Object$entries2 = Object.entries(related);

              case 12:
                if (!(_i3 < _Object$entries2.length)) {
                  _context3.next = 22;
                  break;
                }

                _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2), relationshipName = _Object$entries2$_i[0], relatedInstance = _Object$entries2$_i[1];

                if (!(relatedInstance instanceof _querysets["default"])) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("continue", 19);

              case 16:
                currentId = relatedInstance.id;
                newId = (data.relationships[relationshipName].data || {}).id;

                if (currentId != newId) {
                  if (newId) {
                    related[relationshipName] = this.API["new"](data.relationships[relationshipName]);
                  } else {
                    delete related[relationshipName];
                  }
                }

              case 19:
                _i3++;
                _context3.next = 12;
                break;

              case 22:
                relationships = data.relationships || {};
                delete data.relationships;
                Object.assign(relationships, related);

                this._overwrite(_objectSpread({
                  relationships: relationships
                }, data));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "_saveExisting",
    value: function () {
      var _saveExisting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var payload,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                payload = this.asResourceIdentifier();
                Object.assign(payload, this._generateDataForSaving.apply(this, _args4));
                _context4.next = 4;
                return this.API.request({
                  method: 'patch',
                  url: this._getUrl(),
                  data: {
                    data: payload
                  }
                });

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _saveExisting() {
        return _saveExisting2.apply(this, arguments);
      }

      return _saveExisting;
    }()
  }, {
    key: "_saveNew",
    value: function () {
      var _saveNew2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var payload,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                payload = {
                  type: this.TYPE
                };
                Object.assign(payload, this._generateDataForSaving.apply(this, _args5));
                _context5.next = 4;
                return this.API.request({
                  method: 'post',
                  url: "/".concat(this.TYPE),
                  data: {
                    data: payload
                  }
                });

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _saveNew() {
        return _saveNew2.apply(this, arguments);
      }

      return _saveNew;
    }()
  }, {
    key: "_generateDataForSaving",
    value: function _generateDataForSaving() {
      var result = {};

      for (var _len2 = arguments.length, fields = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fields[_key2] = arguments[_key2];
      }

      var editableFields = fields || this.EDITABLE || [];

      if (editableFields.length) {
        var _iterator = _createForOfIteratorHelper(editableFields),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var field = _step.value;

            if (field in this.attributes) {
              if (!('attributes' in result)) {
                result.attributes = {};
              }

              result.attributes[field] = this.attributes[field];
            } else if (field in this.relationships) {
              if (!('relationships' in result)) {
                result.relationships = {};
              }

              result.relationships[field] = this.relationships[field];
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        if (_.size(this.attributes)) {
          result.attributes = this.attributes;
        }

        if (_.size(this.relationships)) {
          result.relationships = this.relationships;
        }
      }

      return result;
    }
  }, {
    key: "delete",
    // TODO: createWithForm, follow
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.API.request({
                  method: 'delete',
                  url: this._getUrl()
                });

              case 2:
                this.id = null;

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }() // TODO: edit relationships, bulk actions

  }, {
    key: "asResourceIdentifier",
    value: function asResourceIdentifier() {
      return {
        type: this.TYPE,
        id: this.id
      };
    }
  }, {
    key: "asRelationship",
    value: function asRelationship() {
      return {
        data: this.asResourceIdentifier()
      };
    }
  }, {
    key: "_getUrl",
    value: function _getUrl() {
      if ('self' in this.links) {
        return this.links.self;
      } else {
        return "/".concat(this.TYPE, "/").concat(this.id);
      }
    }
  }], [{
    key: "asResource",
    value: function asResource(data) {
      try {
        return this(data);
      } catch (error) {
        return data;
      }
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
        var result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                result = new this({
                  id: id
                });
                _context7.next = 3;
                return result.reload();

              case 3:
                return _context7.abrupt("return", result);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "list",
    value: function list() {
      var TYPE = new this({}).TYPE;
      return new _querysets["default"](this.API, "/".concat(TYPE));
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(data) {
        var instance;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                instance = new this(data);

                if (!instance.id) {
                  _context8.next = 3;
                  break;
                }

                throw "'id' supplied as part of a new instance";

              case 3:
                _context8.next = 5;
                return instance.save();

              case 5:
                return _context8.abrupt("return", instance);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function create(_x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return Resource;
}();

exports["default"] = Resource;