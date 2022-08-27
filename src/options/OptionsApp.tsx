import '../assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Button } from 'react-bootstrap';
import Rules from './Rules';

interface AppState {
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="card-header"><h3 className="card-title">Configure:</h3></div>
        <Button type="button" className="run" aria-label="Run" onClick={() => chrome.tabs.create({ url: '/popup.html' })}>Open popup as tab</Button>

        <Rules />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
