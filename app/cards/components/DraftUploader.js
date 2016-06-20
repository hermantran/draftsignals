import React, { Component } from 'react';
import { FileUploader } from '../../common';

class DraftUploader extends Component {
  render() {
    return (
      <FileUploader onChange={this.props.onChange}/>
    );
  }
}

export default DraftUploader;