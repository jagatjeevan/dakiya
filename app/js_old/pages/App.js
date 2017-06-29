import React from 'react';
import PropTypes from 'prop-types';

export const App = props => (
  <div className="full-height">
    { props.children }
  </div>
  );

App.propTypes = {
  children: PropTypes.object,
};

export default App;
