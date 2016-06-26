import React, { Component } from 'react';
import { Link } from 'react-router';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav-wrapper">
          <span className="brand-logo black-text">Redrafter</span>
          <ul className="right">
            <li><Link className="black-text" to="/">Upload</Link></li>
            <li><Link className="black-text" to="/draft">Draft</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;