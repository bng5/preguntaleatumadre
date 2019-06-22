import React from 'react'
import { addPrefetchExcludes, Root, Routes } from 'react-static';
// import { Link, Router } from 'components/Router';
import { Switch, Route, Link } from 'react-router-dom';

import PageHeader from './components/PageHeader';
import Player from './components/Player';
import './main.scss'

// const xmlns = {
//   ATOM: 'http://www.w3.org/2005/Atom',
//   ITUNES: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
//   PATUM: 'http://www.preguntaleatumadre.com/Feed',
// };

// const seasons = [
//   { value: 2, text: 'Temporada 2' },
//   { value: 1, text: 'Temporada 1' },
// ];

// const meses = [
//   'enero',
//   'febrero',
//   'marzo',
//   'abril',
//   'mayo',
//   'junio',
//   'julio',
//   'agosto',
//   'setiembre',
//   'octubre',
//   'noviembre',
//   'diciembre',
// ];

const radioStreaming = {
  file: 'http://radio.tallerderadio.com:8050/;listen.pls&type=mp3',
  title: 'Radio en vivo',
  duration: null,
  slug: 'radio',
};

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
    this.player = React.createRef();
    this.togglePlay = this.togglePlay.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playRadio = this.playRadio.bind(this);
    // this.changeSeason = this.changeSeason.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  // load (path, replaceList) {
  //   this.setState({ loading: true });
  //   const req = new XMLHttpRequest();
  //   req.addEventListener('load', evt => {
  //     const data = evt.target.responseXML;
  //     if (!data) {
  //       this.setState({ loading: false });
  //       return;
  //     }
  //   //   if (this.state.replaceList) {
  //   //     const historyState = {
  //   //       episodes: this.state.episodes[0],
  //   //       nextPage: this.state.nextPage,
  //   //       playing: this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode),
  //   //     };
  //   //     window.history.replaceState(historyState, document.title, document.location.pathname);
  //   //     const title = 'Preguntale a tu Madre';
  //   //     window.history.pushState({}, title, '/');
  //   //     document.title = title;
  //   //   }
  //     let newState = {
  //       loading: false,
  //       episodes: replaceList ? [] : this.state.episodes,
  //       nextPage: null,
  //       replaceList: false,
  //     };
  //     const items = data.getElementsByTagName('item');
  //     for (let i = 0; i < items.length; i++) {
  //       let rssItem = items.item(i);
  //       let enclosure = rssItem.getElementsByTagName('enclosure').item(0);
  //       let date = new Date(rssItem.getElementsByTagNameNS(xmlns.PATUM, 'date').item(0).firstChild.nodeValue);
  //       newState.episodes.push({
  //         title: rssItem.getElementsByTagName('title').item(0).firstChild.nodeValue,
  //         duration: rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'duration').item(0).firstChild.nodeValue,
  //         episode: parseInt(rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'episode').item(0).firstChild.nodeValue),
  //         fecha: ` ${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`,
  //         file: enclosure.getAttribute('url'),
  //         length: parseInt(enclosure.getAttribute('length')),
  //         url: rssItem.getElementsByTagName('link').item(0).firstChild.nodeValue,
  //         slug: rssItem.getElementsByTagNameNS(xmlns.PATUM, 'slug').item(0).firstChild.nodeValue,
  //       });
  //     }
  //   //   const links = data.getElementsByTagNameNS(xmlns.ATOM, 'link');
  //   //   for (let i = 0; i < links.length; i++) {
  //   //     let link = links.item(i);
  //   //     if (link.getAttribute('rel') === 'next') {
  //   //       newState.nextPage = link.getAttribute('href');
  //   //       break;
  //   //     }
  //   //   }
  //     this.setState(newState);
  //   });
  //   req.addEventListener('error', evt => {
  //     console.error(evt);
  //     this.setState({ loading: false });
  //   });
  //   req.open('GET', path);//this.state.nextPage);
  //   req.send();
  // }

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

  changeSeason (index) {
    // if (index !== this.state.selectedSeason) {
    //   this.setState({
    //     selectedSeason: index,
    //     season: seasons[index],
    //   }, () => this.load(`/feed/temporada${seasons[this.state.selectedSeason].value}/podcast-1.xml`, true));
    // }
  }

  playRadio () {
    this.togglePlay(radioStreaming);
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

  share (path, title, site) {
    const { protocol, host } = document.location;
    const url = encodeURIComponent(`${protocol}//${host}${path}`);
    const sites = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
      facebook: `http://www.facebook.com/sharer.php?u=${url}`,
    };
    window.open(sites[site], 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  render () {
    // let loadMoreClassName = ['load-more'];
    // if (this.state.loading) {
    //   loadMoreClassName.push('loading');
    // }
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
            <Switch>
              {/*
              <Route path="/dynamic" component={Dynamic} />
              */}
              <Route render={() => <Routes />} />
            </Switch>
            {/*
            <Router>
              <Routes path="*" />
            </Router>
            */}
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
