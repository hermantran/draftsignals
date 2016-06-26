import React, { Component } from 'react';
import Header from './Header';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;