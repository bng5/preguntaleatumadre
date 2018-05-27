import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';

const togglePlay = () => {
  console.log('toggle');
};

ReactDOM.render(<Player clickHandler={ togglePlay } currentTime="0:00" endTime="0:00" />, document.getElementById('player-controls'));
