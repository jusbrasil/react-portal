'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

var _legacyPortal = require('./legacy-portal');

var _legacyPortal2 = _interopRequireDefault(_legacyPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line 
var Portal = void 0;

if (_reactDom2.default.createPortal) {
  Portal = _portal2.default;
} else {
  Portal = _legacyPortal2.default;
}

exports.default = Portal;
module.exports = exports['default'];