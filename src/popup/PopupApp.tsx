import '../assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Button } from 'react-bootstrap';
import useChromeStorage from '../hooks/useChromeStorage';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [somePersistentState, setSomePersistentState] = useChromeStorage<string>('somePersistentState');

  return (
    <div>
      <Button type="button" className="run" aria-label="Run" onClick={() => chrome.tabs.create({ url: '/options.html' })}>Configure</Button>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
