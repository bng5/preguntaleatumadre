import React, { Component } from 'react';

import PageHeader from './PageHeader';
import EpisodesList from './EpisodesList';
import Player from './Player';

const seasons = [
  { value: 2, text: 'Temporada 2' },
  { value: 1, text: 'Temporada 1' },
];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playerState: 0,
      playing: null,
      playingEpisode: null,
      progress: 0,
    };
  }

  render () {
    const { episodes } = this.props;
    return (
      <>
        <PageHeader
          title="Preguntale a tu Madre"
          tagline="Donde no existen preguntas estúpidas…"
        />
        <section className="main-content">
          <EpisodesList
            //player={playerInstance}
            episodes={episodes.programas}
            season={seasons[0]}
            replaceList={ episodes.back === true }
            nextPage={episodes.next_page}
          />
          <div className="sidebar">
            <div className="twitter-timeline-wrapper">
              <a className="twitter-timeline" href="https://twitter.com/preguntaleatum?ref_src=twsrc%5Etfw">Tweets de Preguntale a tu Madre</a>
            </div>
          </div>
        </section>
        { this.state.playing && <Player /> }
      </>
    );
  }
}

export default App;
