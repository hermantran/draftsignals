import React, { Component } from 'react';
import { FileUploader } from '../../common';

class DraftUploader extends Component {
  render() {
    return (
      <FileUploader onUpload={this.props.actions.uploadDraft}/>
    );
  }
}

export default DraftUploader;