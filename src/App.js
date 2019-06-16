import React from 'react'
import { addPrefetchExcludes, Root, Routes } from 'react-static'
import { Link, Router } from 'components/Router';

import PageHeader from './components/PageHeader';
import Player from './components/Player';
import './main.scss'

// const xmlns = {
//   ATOM: 'http://www.w3.org/2005/Atom',
//   ITUNES: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
//   PATUM: 'http://www.preguntaleatumadre.com/Feed',
// };

const seasons = [
  { value: 2, text: 'Temporada 2' },
  { value: 1, text: 'Temporada 1' },
];

const meses = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'setiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const radioStreaming = {
  file: 'http://radio.tallerderadio.com:8050/;listen.pls&type=mp3',
  title: 'Radio en vivo',
  duration: null,
  slug: 'radio',
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      season: seasons[0],
      selectedSeason: 0,
      episodes: [],//props.episodes.programas,
      playerState: 0,
      playing: radioStreaming,
      playingEpisode: null,
      progress: 0,
      nextPage: props.nextPage,
      replaceList: props.replaceList,
      loading: false,
    };
    this.player = React.createRef();
    // this.togglePlay = this.togglePlay.bind(this);
    // this.playNext = this.playNext.bind(this);
    this.playRadio = this.playRadio.bind(this);
    // this.changeSeason = this.changeSeason.bind(this);
    // this.updateState = this.updateState.bind(this);
  }

  playRadio () {

  }

  render () {
    return (
      <Root>
        <PageHeader
          title="Preguntale a tu Madre"
          tagline="Donde no existen preguntas estúpidas…"
          togglePlay={this.playRadio}
          playerState={this.state.playing && this.state.playing.slug === 'radio' ? this.state.playerState : null}
        />
        <section className="main-content">
          <React.Suspense fallback={<em>Cargando...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </section>
        <Player
          ref={this.player}
          episode={this.state.playing}
          onUpdateState={this.updateState}
        />
      </Root>
    );
  }
}

export default App;
