import React from 'react';
import i18next from 'i18next';

class DispatchableComponent extends React.Component {
  static get contextTypes() {
    return {i18next: React.PropTypes.any};
  }
  t(key) {
    return this.context.i18next.t(key);
  }
}

export default DispatchableComponent
