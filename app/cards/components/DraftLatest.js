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
        {data.deck ? getDeckLink(data) : null}
      </div>
    );

    const getDeckLink = (data) => (
      <span className="spaced">
        (<Link className="blue-text" to={`deck/${data.id}`}>Deck</Link>)
      </span>
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