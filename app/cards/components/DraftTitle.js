import React from 'react';
import { Link } from 'react-router';
import './draft-title.scss';

function DraftTitle({ title, id, deckShown, draftShown, commentsShown, toggleComments }) {
  const deckLink = (
    <Link className="grey-text" to={`/deck/${id}`}>View Deck</Link>
  );

  const draftLink = (
    <Link className="grey-text" to={`/draft/${id}`}>View Draft</Link>
  );

  const commentsLink = (
    <a className="pointer grey-text" onClick={toggleComments}>
      {commentsShown ? 'Hide' : 'Show'} Comments
    </a>
  );

  return (
    <div className="center draft-title">
      <div className="grey-text">{title}</div>
      {deckShown ? deckLink : null}
      {draftShown ? draftLink : null}
      {deckShown || draftShown ? <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}
      {commentsLink}
    </div>
  );
}

export default DraftTitle;