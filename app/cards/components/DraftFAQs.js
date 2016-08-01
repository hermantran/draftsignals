import React from 'react';

function DraftFAQs() {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">FAQs</div>
        <div className="margin">
          <strong>Where can I find draft log files to upload?</strong>
          <p>
            From the top navigation bar of MTGO, click on <em>Account</em>.
            Then, from the left sidebar, click on <em>Game History</em> under the <em>Settings</em> header.
            In the <em>Filters</em> section that appears below, there will be a checkbox for <em>Auto Save Draft Logs</em>.
            This must be checked prior to the start of your draft event for the log file to be saved.
            Immediately below the checkbox is the location that MTGO saves the log files to, as well as a button to change that location.
          </p>
        </div>
        <div className="margin">
          <strong>Where can I find deck files to upload?</strong>
          <p>
            From the top navigation bar of MTGO, click on <em>Collection</em>.
            In the <em>Decks &amp; Binders</em> section, expand the <em>Freeform</em> tab.
            MTGO saves all decks you submit for draft events as entries in this tab.
            Right click on the matching deck entry and click <em>Export</em>.
            In the dialog box that appears, make sure to select <em>Save as type: Plain TXT format</em> before exporting.
          </p>
        </div>
        <div className="margin">
          <strong>What is the source of the card images and data?</strong>
          <p>
            The card images are retrieved from Gatherer, while the card data is retrieved from <a href="https://mtgjson.com/" target="_blank">MTG JSON</a>.
            Both the card images and data are copyright Wizards of the Coast LLC, a subsidiary of Hasbro, Inc.
            This website is not affiliated with, maintained, authorized, endorsed or sponsored by Wizards of the Coast in any way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DraftFAQs;