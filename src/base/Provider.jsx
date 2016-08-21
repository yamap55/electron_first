import React from 'react';
import i18next from 'i18next';

class Provider extends React.Component {
  static get childContextTypes() {
      return {i18next: React.PropTypes.any};
  }

  getChildContext() {
    return {i18next: this.i18next};
  }

  constructor(props) {
    super(props);
    i18next.init({
      lng:'ja', // TODO
      fallbackLng:'ja', // TODO
      resources:{
        "ja":{
          translation:require('../../locales/ja/translation.json')
        },
        "en": {
          translation:require('../../locales/en/translation.json')
        }
      }
    });
    this.i18next = i18next;
  }
}

export default Provider
