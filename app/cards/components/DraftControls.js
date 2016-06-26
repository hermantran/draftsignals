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
          <button className="btn" onClick={this.props.onPrev}>&lt;&lt;</button>
          &nbsp;
          <div className="pack-pick-menu-wrapper">
            <button className="btn pack-pick-button">Jump To</button>
            <select className="browser-default pack-pick-menu"
             onChange={this.handleSelectChange}>
              {getSelectOptions(this.props.packCount, this.props.pickCount)}
            </select>
          </div>
          &nbsp;
          <button className="btn" onClick={this.props.onNext}>&gt;&gt;</button>
          
        </div>
        <div>
          Always show:
          <Checkbox id="toggleSelected" label="Pick"
           checked={this.props.selectedShown}
           onClick={this.props.toggleSelected}/>
          <Checkbox id="toggleMissing" label="Missing cards"
           checked={this.props.missingShown}
           onClick={this.props.toggleMissing}/>
        </div>
      </div>
    );
  }
}

export default DraftControls;