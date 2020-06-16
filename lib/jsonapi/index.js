"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "JsonApi", {
  enumerable: true,
  get: function get() {
    return _apis["default"];
  }
});
Object.defineProperty(exports, "Resource", {
  enumerable: true,
  get: function get() {
    return _resources["default"];
  }
});

var _apis = _interopRequireDefault(require("./apis"));

var _resources = _interopRequireDefault(require("./resources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }