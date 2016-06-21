import React, { Component } from 'react';
import './checkbox.scss';

class Checkbox extends Component {
  render() {
    return (
      <span className="checkbox-wrapper">
        <input type="checkbox" id={this.props.id} className="filled-in"
         checked={this.props.checked ? 'checked' : null }/>
        <label for={this.props.id} onClick={this.props.onClick}>
          {this.props.label}
        </label>
      </span>
    );
  }
}

export default Checkbox;