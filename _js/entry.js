import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import EpisodesList from './components/EpisodesList';

var playerInstance = ReactDOM.render(<Player />, document.getElementById('player-container'));

if (document.getElementById('data')) {
  var episodes = JSON.parse(document.getElementById('data').firstChild.textContent);
  var episodesList = ReactDOM.render(<EpisodesList player={playerInstance} episodes={episodes.programas} replaceList={ episodes.back === true } nextPage={episodes.next_page} />, document.getElementById('programas'));

  window.onpopstate = function(event) {
    if (event.state && event.state.episodes) {
      // episodesList.setEpisodes([event.state]);
      episodesList.setState({
        episodes: [ event.state.episodes ],
        replaceList: true,
        nextPage: event.state.nextPage,
      }, () => {
        episodesList.findIndex();
      });
      document.title = `${event.state.title} - Preguntale a tu Madre`;
    } else {
      episodesList.load();
    }
  };
} else {
  const playerInfo = decodeURIComponent(document.location.hash.substr(1)).split('|');
  const ep = {
    filename: playerInfo[0],
    title: playerInfo[1],
    duration: playerInfo[2],
  };
  playerInstance.togglePlay(ep, () => {
  });
}

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
