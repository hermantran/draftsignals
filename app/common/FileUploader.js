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
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" onChange={this.handleChange}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"/>
        </div>
      </div>
    );
  }
}

export default FileUploader;