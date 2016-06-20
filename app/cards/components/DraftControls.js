import React, { Component } from 'react';

class DraftControls extends Component {
  render() {
    return (
      <div>
        <button className="btn" onClick={this.props.onPrev}>&lt;&lt;</button>
        <button className="btn" onClick={this.props.onNext}>&gt;&gt;</button>
      </div>
    );
  }
}

export default DraftControls;