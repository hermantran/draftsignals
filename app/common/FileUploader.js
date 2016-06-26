import React, { Component } from 'react';
import classNames from 'classnames';

class FileUploader extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.state = { 
      filename: '',
      files: null
    };
  }

  handleChange(e) {
    this.setState({ 
      filename: e.target.value.replace('C:\\fakepath\\', ''),
      files: e.target.files
    });
  }

  handleUpload() {
    if (!this.state.files) {
      return;
    }

    this.props.onUpload(this.state.files);
  }

  render() {
    let fileTextClass = classNames({
      'file-path': true,
      valid: this.state.filename
    });

    return (
      <div>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleChange}/>
          </div>
          <div className="file-path-wrapper">
            <input className={fileTextClass} type="text" value={this.state.filename}/>
          </div>
        </div>
        <div className="btn" onClick={this.handleUpload}>
          Upload
        </div>
      </div>
    );
  }
}

export default FileUploader;