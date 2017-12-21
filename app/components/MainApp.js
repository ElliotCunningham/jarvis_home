import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainApp extends Component {

  static childContextTypes = { stylesLoader: PropTypes.func };

  constructor(props) {
    super(props);
    this._testInitialisation();
  }

  getChildContext() {
    const stylesLoader = (name) => { console.log('load styles for =>', name); };
    return { stylesLoader };
  }

  _testInitialisation() {
    console.log('react is ready to render');
    console.log('props ==>', this.props);
    console.log('context ==>', this.context);
  }

  render() {
    return(
      <div className='main_container' style={{ width: '100%', height: '100%' }}>
        Welcome to React App.
      </div>
    );
  }
}

export default MainApp;
