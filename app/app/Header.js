import React, { Component } from 'react';
import { Link } from 'react-router';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav-wrapper">
          <Link to="/"><span className="brand-logo center black-text">DraftSignals</span></Link>
          <ul className="left">
            <li><Link className="black-text" to="/">Upload</Link></li>
          </ul>
          <ul className="right">
            <li><Link className="black-text" to="/faq">FAQ</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;