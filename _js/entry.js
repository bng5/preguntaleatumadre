import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import EpisodesList from './components/EpisodesList';

var playerInstance = ReactDOM.render(<Player />, document.getElementById('player-container'));

var episodes = JSON.parse(document.getElementById('data').firstChild.textContent);
ReactDOM.render(<EpisodesList player={playerInstance} episodes={episodes.programas} loadMore={episodes.load_more} />, document.getElementById('programas'));

// document.getElementById('radio-playback').addEventListener('click', function (ev) {
//   ev.preventDefault();
//   playerInstance.togglePlay({
//     filename: this.href,
//     title: 'Mediarte en vivo',
//     duration: null,
//   }, function (err, state) {
//     if (err) {
//       console.log('Error!');
//     }
//     console.log(state);
//   });
//   // var file = this.dataset.src;
//   // Player.play(file, this);
// });
