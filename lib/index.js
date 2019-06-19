import ReactDOM from 'react-dom';

import PortalR16 from './portal';
import LegacyPortal from './legacy-portal';

// eslint-disable-next-line 
let Portal;

if (ReactDOM.createPortal) {
  Portal = PortalR16;
} else {
  Portal = LegacyPortal;
}

export default Portal;
