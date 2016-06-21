import React, { Component } from 'react';
import { Checkbox } from '../../common';

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
      <div>
        <div>
          <button className="btn" onClick={this.props.onPrev}>&lt;&lt;</button>
          <button className="btn" onClick={this.props.onNext}>&gt;&gt;</button>
          <select className="browser-default"
           onChange={this.handleSelectChange}>
            {getSelectOptions(this.props.packCount, this.props.pickCount)}
          </select>
        </div>
        <div>
          Always show:
          <Checkbox id="toggleSelected" label="Pick"
           checked={this.props.selectedShown}
           onClick={this.props.toggleSelected}/>
          <Checkbox id="toggleReserved" label="Reserved cards"
           checked={this.props.reservedShown}
           onClick={this.props.toggleReserved}/>
          <Checkbox id="toggleMissing" label="Missing cards"
           checked={this.props.missingShown}
           onClick={this.props.toggleMissing}/>
        </div>
      </div>
    );
  }
}

export default DraftControls;