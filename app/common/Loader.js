import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './loader.scss';

const propTypes = {
  isTiny: PropTypes.bool
};

const defaultProps = {
  isTiny: false
};

function Loader({ isTiny }) {
  const wrapperClass = classNames({
    'preloader-wrapper active spaced': true,
    tiny: isTiny
  });

  return (
    <div className={wrapperClass}>
      <div className="spinner-layer spinner-teal-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;