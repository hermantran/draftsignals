import React from 'react';
import cards from '../cards';

const { DraftFAQs } = cards.components;

function FAQs() {
  return (
    <div className="row">
      <div className="col s12 l6 offset-l3">
        <DraftFAQs />
      </div>
    </div>
  );
}

export default FAQs;