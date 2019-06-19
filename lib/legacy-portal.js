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
    onUpdate: PropTypes.func,
  };

  constructor() {
    super();
    this.state = { active: false };
    this.closePortal = this.closePortal.bind(this);
    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.openPortal();
    }
  }

  componentWillReceiveProps(newProps) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.active) {
          this.renderPortal(newProps);
        } else {
          this.openPortal(newProps);
        }
      }
      if (!newProps.isOpened && this.state.active) {
        this.closePortal();
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps);
    }
  }

  componentWillUnmount() {
    this.closePortal(true);
  }

  openPortal(props = this.props) {
    this.setState({ active: true });
    this.renderPortal(props);
    this.props.onOpen(this.node);
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        const htmlElement = this.targetElement(this.props.targetSelector);
        htmlElement.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;
      if (isUnmounted !== true) {
        this.setState({ active: false });
      }
    };

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
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

  renderPortal(props) {
    if (!this.node) {
      this.node = document.createElement('div');
      const htmlElement = this.targetElement(props.targetSelector);
      htmlElement.appendChild(this.node);
    }

    let children = props.children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal });
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    );
  }

  render() {
    return null;
  }
}
