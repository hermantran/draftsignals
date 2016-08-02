import React, { Component } from 'react';
import { Checkbox } from '../../common';
import './draft-controls.scss';

class DraftControls extends Component {
  constructor() {
    super();
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    let value = e.target.value.split('|').map(i => parseInt(i, 10)),
        pack = value[0],
        pick = value[1];
    this.props.selectPackPick(pack, pick);
  }

  render() {
    const { onPrev, packCount, pickCount, showSelectedOnce, onNext,
      selectedShown, toggleSelected, missingShown, toggleMissing,
      previousShown, togglePrevious, pack, pick } = this.props;

    const getTitle = () => {
      return pick ? <strong>Pack {pack} Pick {pick}</strong> : null;
    };

    const getSelectOptions = (packCount, pickCount) => {
      return Array(packCount * pickCount).fill().map((_,i) => {
        let pack = Math.ceil((i + 1) / pickCount),
            pick = i % pickCount + 1;
        return getSelectOption(pack, pick);
      });
    };

    const getSelectOption = (pack, pick) => {
      let value = pack + '|' + pick;
      return <option key={value} value={value}>P{pack}P{pick}</option>;
    };

    return (
      <div className="draft-controls center">
        <h5>{getTitle()}</h5>
        <div>
          <button className="btn" onClick={onPrev}>&#10094;</button>
          &nbsp;
          <div className="pack-pick-menu-wrapper">
            <button className="btn pack-pick-button">Jump To</button>
            <select className="browser-default pack-pick-menu"
             value={`${pack}|${pick}`}
             onChange={this.handleSelectChange}>
              {getSelectOptions(packCount, pickCount)}
            </select>
          </div>
          &nbsp;
          <button className="btn" onClick={showSelectedOnce}>Show Pick</button>
          &nbsp;&nbsp;
          <button className="btn" onClick={onNext}>&#10095;</button>
          
        </div>
        <div className="margin">
          Always Show:
          <Checkbox 
            id="toggleSelected"
            label="Pick"
            checked={selectedShown}
            onChange={toggleSelected}
          />
          <Checkbox
            label="Cards Taken"
            id="toggleMissing" 
            checked={missingShown}
            onChange={toggleMissing}
          />
          <Checkbox
            id="togglePrevious"
            label="Previous Picks"
            checked={previousShown}
            onChange={togglePrevious}
          />
        </div>
      </div>
    );
  }
}

export default DraftControls;