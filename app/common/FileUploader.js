import React, { Component } from 'react';

class FileUploader extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <input type="file" onChange={this.handleChange}/>
    );
  }
}

export default FileUploader;