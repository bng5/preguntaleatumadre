import React from 'react'
import { addPrefetchExcludes, Root, Routes } from 'react-static';
// import { Link, Router } from 'components/Router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-119802091-1');

import PageHeader from './components/PageHeader';
import Player from './components/Player';
import './main.scss'

import { IDDLE, PLAYING, PAUSED, SEEKING } from './constants';

// const xmlns = {
//   ATOM: 'http://www.w3.org/2005/Atom',
//   ITUNES: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
//   PATUM: 'http://www.preguntaleatumadre.com/Feed',
// };

const radioStreaming = {
  file: '',
  title: '',
  duration: null,
  slug: 'radio',
  status: 0,
  state: IDDLE,
  progress: 0,
  currentTime: '0:00',
};

const playerStateReducer = (playing = radioStreaming, action) => {
  switch (action.type) {
    case 'PROGRESS':
      return {
        ...playing,
        progress: action.progress,
        currentTime: action.currentTime,
      };
    case 'STATE_CHANGE':
      return {
        ...playing,
        state: action.state,
      };
    case 'TOGGLE_PLAY':
      if (playing && (!action.file || playing.file === action.file)) {
        return {
          ...playing,
          status: (playing.status === PLAYING ? PAUSED : PLAYING),
          state: 0,
        };
      }
      return {
        ...playing,
        file: action.file,
        title: action.title,
        slug: action.slug,
        status: PLAYING,
        duration: action.duration,
        progress: 0,
      };
    default:
      return playing;
  }
};

let store = createStore(playerStateReducer);

class App extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      // season: seasons[0],
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
    this.togglePlay = this.togglePlay.bind(this);
    this.playNext = this.playNext.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState (err, data) {
    if (err) {
      console.error('Error!', err);
    }
    const newState = {};
    switch (data.type) {
      case 'changeEpisode':
        newState.playing = data.episode;
        newState.progress = data.progress;
        break;
      case 'progress':
        if (this.state.progress === data.progress) {
          return;
        }
        newState.progress = data.progress;
        break;
      case 'stateChange':
        newState.playerState = data.state;
        break;
      case 'end':
        newState.playing = null;
        newState.playerState = data.state;
        // this.playNext();
        break;
    }
    this.setState(newState);
  }

  togglePlay (episode) {
    this.player.current.togglePlay(episode);
  }

  playNext () {
    let key = this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode);
    if (key >= 0) {
      key++;
      if (this.state.episodes[key]) {
        this.togglePlay(this.state.episodes[key].episode);
      }
    }
  }

  // share (path, title, site) {
  //   const { protocol, host } = document.location;
  //   const url = encodeURIComponent(`${protocol}//${host}${path}`);
  //   const sites = {
  //     twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
  //     facebook: `http://www.facebook.com/sharer.php?u=${url}`,
  //   };
  //   window.open(sites[site], 'sharer', 'toolbar=0,status=0,width=626,height=436');
  // }

  render () {
    // let loadMoreClassName = ['load-more'];
    // if (this.state.loading) {
    //   loadMoreClassName.push('loading');
    // }
    return (
      <Root>
        <Provider store={store}>
          <PageHeader
            title="Preguntale a tu Madre"
            tagline="Donde no existen preguntas estúpidas…"
            // togglePlay={this.playRadio}
            playerState={this.state.playing && this.state.playing.slug === 'radio' ? this.state.playerState : null}
            episode={radioStreaming}
          />
          <section className="main-content">
            <React.Suspense fallback={<em style={{ flex: 1 }}>Cargando…</em>}>
              <Switch>
                <Route render={() => <Routes />} />
              </Switch>
            </React.Suspense>
            <div className="sidebar">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="preguntaleatum"
                options={{ height: 1024 }}
              />
            </div>
          </section>
          <Player
            episode={this.state.playing}
            onUpdateState={this.updateState}
          />
        </Provider>
      </Root>
    );
  }
}

export default App;
