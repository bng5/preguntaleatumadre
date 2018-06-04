import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import EpisodesList from './components/EpisodesList';

var playerInstance = ReactDOM.render(<Player />, document.getElementById('player-container'))

var episodes = JSON.parse(document.getElementById('data').firstChild.textContent);
ReactDOM.render(<EpisodesList player={playerInstance} episodes={episodes} />, document.getElementById('programas-react'));

document.getElementById('radio-playback').addEventListener('click', function (ev) {
  ev.preventDefault();
  playerInstance.togglePlay(this.href, 'Mediarte en vivo', null);
  // var file = this.dataset.src;
  // Player.play(file, this);
});
