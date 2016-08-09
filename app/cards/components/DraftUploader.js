import React, { Component } from 'react';
import classNames from 'classnames';
import { FileUploader, Loader } from '../../common';

class DraftUploader extends Component {
  constructor() {
    super();
    this.handleDraftSelect = this.handleDraftSelect.bind(this);
    this.handleDeckSelect = this.handleDeckSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.state = {
      draftFiles: null,
      deckFiles: null
    };
  }

  componentWillMount() {
    this.props.actions.resetError();
  }

  handleDraftSelect(files) {
    this.setState({
      draftFiles: files
    });
  }

  handleDeckSelect(files) {
    this.setState({
      deckFiles: files
    });
  }

  handleUpload() {
    let { actions } = this.props;
    actions.upload(this.state.draftFiles, this.state.deckFiles);
  }

  render() {
    let buttonClass = classNames({
      btn: true,
      disabled: this.props.loading
    });

    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">Upload</div>
          <div>Select a draft log file (<code>.txt</code>):</div>
          <FileUploader onChange={this.handleDraftSelect}/>
          <div>(Optional) Select an associated deck file (<code>.txt</code>):</div>
          <FileUploader onChange={this.handleDeckSelect}/>
        </div>
        <div className="card-action">
          <button className={buttonClass} onClick={this.handleUpload}>Upload</button>
          { this.props.loading ? <Loader isTiny={true} /> : null }
          { this.props.success ? null : <div className="red-text">An error occurred. Please ensure that you have selected a valid MTGO draft log file.</div> }
        </div>
      </div>
    );
  }
}

export default DraftUploader;