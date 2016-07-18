import React, { Component } from 'react';
import './checkbox.scss';

class Checkbox extends Component {
  render() {
    return (
      <span className="checkbox-wrapper spaced" onClick={this.props.onClick}>
        <input type="checkbox" id={this.props.id} className="filled-in"
         checked={this.props.checked}
        />
        <label>{this.props.label}</label>
      </span>
    );
  }
}

export default Checkbox;