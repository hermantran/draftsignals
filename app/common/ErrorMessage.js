import React, { PropTypes } from 'react';

const propTypes = {
  error: PropTypes.string.isRequired
};

function ErrorMessage({ error }) {
  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card-panel center red-text">
          <strong>{error}</strong>
        </div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;