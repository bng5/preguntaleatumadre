import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import EpisodesList from './components/EpisodesList';

// const togglePlay = () => {
//   console.log('toggle ');
// };

var playerInstance = ReactDOM.render(<Player ref= clickHandler={ togglePlay } />, document.getElementById('player-controls'))
console.log(playerInstance);

var episodes = JSON.parse(document.getElementById('data').firstChild.textContent);
ReactDOM.render(<EpisodesList player={playerInstance} episodes={episodes} />, document.getElementById('programas-react'));
