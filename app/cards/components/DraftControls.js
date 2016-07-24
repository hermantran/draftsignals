import React, { Component } from 'react';
import { Checkbox } from '../../common';
import { Link } from 'react-router';
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
    const getTitle = () => {
      let { pack, pick } = this.props;
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
      <div className="center">
        <h5>{getTitle()}</h5>
        <div>
          <button className="btn" onClick={this.props.onPrev}>&#10094;</button>
          &nbsp;
          <div className="pack-pick-menu-wrapper">
            <button className="btn pack-pick-button">Jump To</button>
            <select className="browser-default pack-pick-menu"
             onChange={this.handleSelectChange}>
              {getSelectOptions(this.props.packCount, this.props.pickCount)}
            </select>
          </div>
          &nbsp;
          <button className="btn" onClick={this.props.onNext}>&#10095;</button>
          
        </div>
        <div className="margin-top">
          Always Show:
          <Checkbox 
            id="toggleSelected"
            label="Pick"
            checked={this.props.selectedShown}
            onChange={this.props.toggleSelected}
          />
          <Checkbox
            label="Cards Taken"
            id="toggleMissing" 
            checked={this.props.missingShown}
            onChange={this.props.toggleMissing}
          />
          <Checkbox
            id="togglePrevious"
            label="Previous Picks"
            checked={this.props.previousShown}
            onChange={this.props.togglePrevious}
          />
          <Link className="black-text" to="/deck">Deck</Link>
        </div>
      </div>
    );
  }
}

export default DraftControls;