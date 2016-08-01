import React, { Component } from 'react';
import ReactDisqusThread from 'react-disqus-thread';

class DraftComments extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  render() {
    const { id } = this.props;
    return (
      <div className="row">
        <div className="col s12 offset-l2 l8">
          <ReactDisqusThread
            shortname="draftsignals"
            identifier={id}
            title="Draft Comments"
            url={`http://draftsignals.com/draft/${id}`}
          />
        </div>
      </div>
    );
  }
}

export default DraftComments;