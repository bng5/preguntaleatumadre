import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import EpisodesList from './components/EpisodesList';

var playerInstance = ReactDOM.render(<Player />, document.getElementById('player-container'));

var episodes = JSON.parse(document.getElementById('data').firstChild.textContent);
var episodesList = ReactDOM.render(<EpisodesList player={playerInstance} episodes={episodes.programas} replaceList={ episodes.back === true } nextPage={episodes.next_page} />, document.getElementById('programas'));

window.onpopstate = function(event) {
  if (event.state) {
    episodesList.setEpisodes([event.state]);
    document.title = `${event.state.title} - Preguntale a tu Madre`;
  }
};

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
