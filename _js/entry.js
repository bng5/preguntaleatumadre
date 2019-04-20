import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const episodes = JSON.parse(document.getElementById('data').firstChild.textContent);

render(
  <App
    episodes={episodes}
  />,
  document.getElementById('app')
);

/*
var playerInstance = ReactDOM.render(<Player />, document.getElementById('player-container'));

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
*/


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
