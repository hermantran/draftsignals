import React, { Component } from 'react';
import { Link } from 'react-router';

class DraftLatest extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.getLatestDrafts();
  }

  render() {
    const { latest } = this.props;

    const getLink = (data) => (
      <div className="row" key={data.id}>
        <Link className="blue-text" to={`draft/${data.id}`}>{data.title}</Link>
      </div>
    );

    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">Latest Drafts</div>
          <div className="margin-top"></div>
          {latest.map(getLink)}
        </div>
      </div>
    );
  }
}

export default DraftLatest;