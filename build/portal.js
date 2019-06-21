'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function disableEventBubbling(children) {
  var stopPropagation = function stopPropagation(e) {
    return e.stopPropagation();
  };
  return _react2.default.createElement(
    'span',
    {
      onClick: stopPropagation,
      onDoubleClick: stopPropagation,
      onContextMenu: stopPropagation,

      onDrag: stopPropagation,
      onDragEnd: stopPropagation,
      onDragEnter: stopPropagation,
      onDragExit: stopPropagation,
      onDragLeave: stopPropagation,
      onDragOver: stopPropagation,
      onDragStart: stopPropagation,
      onDrop: stopPropagation,

      onMouseDown: stopPropagation,
      onMouseEnter: stopPropagation,
      onMouseLeave: stopPropagation,
      onMouseMove: stopPropagation,
      onMouseOver: stopPropagation,
      onMouseOut: stopPropagation,
      onMouseUp: stopPropagation,

      onKeyDown: stopPropagation,
      onKeyPress: stopPropagation,
      onKeyUp: stopPropagation,

      onFocus: stopPropagation,
      onBlur: stopPropagation,

      onChange: stopPropagation,
      onInput: stopPropagation,
      onInvalid: stopPropagation,
      onSubmit: stopPropagation
    },
    children
  );
}

var Portal = function (_React$PureComponent) {
  _inherits(Portal, _React$PureComponent);

  function Portal(props) {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, props));

    _this.state = { active: props.isOpened };
    _this.closePortal = _this.closePortal.bind(_this);
    _this.node = null;
    return _this;
  }

  _createClass(Portal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.isOpened !== this.state.active) {
        if (newProps.isOpened) {
          this.openPortal(newProps);
        } else {
          this.closePortal();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.node) {
        var htmlElement = this.targetElement(this.props.targetSelector);
        htmlElement.removeChild(this.node);
      }
    }
  }, {
    key: 'openPortal',
    value: function openPortal() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.setState({ active: true });
      props.onOpen();
    }
  }, {
    key: 'closePortal',
    value: function closePortal() {
      if (this.state.active) {
        this.setState({ active: false });
        if (this.props.beforeClose) {
          this.props.beforeClose();
        }

        this.props.onClose();
      }
    }
  }, {
    key: 'targetElement',
    value: function targetElement(targetSelector) {
      var htmlElement = document.querySelector(targetSelector);
      if (!htmlElement) {
        return document.body;
      }
      return htmlElement;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.active) {
        return null;
      }

      if (!this.node) {
        this.node = document.createElement('div');
        var htmlElement = this.targetElement(this.props.targetSelector);
        htmlElement.appendChild(this.node);
      }

      return _reactDom2.default.createPortal(this.props.enableEventBubbling ? this.props.children : disableEventBubbling(this.props.children), this.node);
    }
  }]);

  return Portal;
}(_react2.default.PureComponent);

Portal.defaultProps = {
  targetSelector: 'body',
  onOpen: function onOpen() {},
  onClose: function onClose() {}
};
Portal.propTypes = {
  children: _propTypes2.default.element.isRequired,
  targetSelector: _propTypes2.default.string,
  enableEventBubbling: _propTypes2.default.bool,
  isOpened: _propTypes2.default.bool,
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  beforeClose: _propTypes2.default.func
};
exports.default = Portal;
module.exports = exports['default'];