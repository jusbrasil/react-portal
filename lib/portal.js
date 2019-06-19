import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Portal extends React.PureComponent {

  static defaultProps = {
    targetSelector: 'body',
    onOpen: () => {},
    onClose: () => {},
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    targetSelector: PropTypes.string,
    isOpened: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    beforeClose: PropTypes.func,
  };

  constructor() {
    super();
    this.state = { active: this.props.isOpened };
    this.closePortal = this.closePortal.bind(this);
    this.node = null;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpened !== this.state.active) {
      if (newProps.isOpened) {
        this.openPortal(newProps);
      } else {
        this.closePortal();
      }
    }
  }

  componentWillUnmount() {
    if (this.node) {
      const htmlElement = this.targetElement(this.props.targetSelector);
      htmlElement.removeChild(this.node);
    }
  }

  openPortal(props = this.props) {
    this.setState({ active: true });
    props.onOpen();
  }

  closePortal() {
    if (this.state.active) {
      this.setState({ active: false });
      if (this.props.beforeClose) {
        this.props.beforeClose();
      }

      this.props.onClose();
    }
  }

  targetElement(targetSelector) {
    const htmlElement = document.querySelector(targetSelector);
    if (!htmlElement) {
      return document.body;
    }
    return htmlElement;
  }

  render() {
    if (!this.state.active) {
      return null;
    }

    if (!this.node) {
      this.node = document.createElement('div');
      const htmlElement = this.targetElement(this.props.targetSelector);
      htmlElement.appendChild(this.node);
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.node
    );
  }
}
