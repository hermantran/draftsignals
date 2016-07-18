import React, { Component } from 'react';
import classNames from 'classnames';

class FileUploader extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = { 
      filename: ''
    };
  }

  handleChange(e) {
    let { files } = e.target;
    this.setState({ 
      filename: e.target.value.replace('C:\\fakepath\\', '')
    });

    this.props.onChange(files);
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
      </div>
    );
  }
}

export default FileUploader;