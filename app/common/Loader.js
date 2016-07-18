import React, { Component } from 'react';
import './loader.scss';

class Loader extends Component {
  render() {
    return (
      <div className="preloader-wrapper tiny active spaced">
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
}

export default Loader;