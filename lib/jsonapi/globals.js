"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonapiSetup = jsonapiSetup;
exports.register = register;
exports.globals = void 0;
var globals = {
  registry: {}
};
exports.globals = globals;

function jsonapiSetup(auth) {
  var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://rest.api.transifex.com';
  globals.auth_header = "Bearer ".concat(auth);
  globals.host = host;
}

function register(cls) {
  var TYPE = new cls({}).TYPE;

  if (TYPE) {
    globals.registry[TYPE] = cls;
  }
}