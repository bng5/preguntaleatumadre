import React, { Component } from 'react';

import PageHeader from './PageHeader';
// import EpisodesList from './EpisodesList';
import Dropdown from './Dropdown';
import Episode from './Episode';
import Player from './Player';

const xmlns = {
  ATOM: 'http://www.w3.org/2005/Atom',
  ITUNES: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
  PATUM: 'http://www.preguntaleatumadre.com/Feed',
};

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

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      season: seasons[0],
      selectedSeason: 0,
      episodes: props.episodes.programas,
      playerState: 0,
      playing: null,
      playingEpisode: null,
      progress: 0,
      // loadMore: true,//props.loadMore,
      nextPage: props.nextPage,
      replaceList: props.replaceList,
      loading: false,
    };
    this.player = React.createRef();
    this.togglePlay = this.togglePlay.bind(this);
    this.playNext = this.playNext.bind(this);
    this.changeSeason = this.changeSeason.bind(this);
  }

  load (path, replaceList) {
    this.setState({ loading: true });
    const req = new XMLHttpRequest();
    req.addEventListener('load', evt => {
      const data = evt.target.responseXML;
      if (!data) {
        this.setState({ loading: false });
        return;
      }
    //   if (this.state.replaceList) {
    //     const historyState = {
    //       episodes: this.state.episodes[0],
    //       nextPage: this.state.nextPage,
    //       playing: this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode),
    //     };
    //     window.history.replaceState(historyState, document.title, document.location.pathname);
    //     const title = 'Preguntale a tu Madre';
    //     window.history.pushState({}, title, '/');
    //     document.title = title;
    //   }
      let newState = {
        loading: false,
        episodes: replaceList ? [] : this.state.episodes,
        nextPage: null,
        replaceList: false,
      };
      const items = data.getElementsByTagName('item');
      for (let i = 0; i < items.length; i++) {
        let rssItem = items.item(i);
        let enclosure = rssItem.getElementsByTagName('enclosure').item(0);
        let date = new Date(rssItem.getElementsByTagNameNS(xmlns.PATUM, 'date').item(0).firstChild.nodeValue);
        newState.episodes.push({
          title: rssItem.getElementsByTagName('title').item(0).firstChild.nodeValue,
          duration: rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'duration').item(0).firstChild.nodeValue,
          episode: parseInt(rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'episode').item(0).firstChild.nodeValue),
          fecha: ` ${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`,
          file: enclosure.getAttribute('url'),
          length: parseInt(enclosure.getAttribute('length')),
          url: rssItem.getElementsByTagName('link').item(0).firstChild.nodeValue,
          slug: rssItem.getElementsByTagNameNS(xmlns.PATUM, 'slug').item(0).firstChild.nodeValue,
        });
      }
    //   const links = data.getElementsByTagNameNS(xmlns.ATOM, 'link');
    //   for (let i = 0; i < links.length; i++) {
    //     let link = links.item(i);
    //     if (link.getAttribute('rel') === 'next') {
    //       newState.nextPage = link.getAttribute('href');
    //       break;
    //     }
    //   }
      this.setState(newState, () => {
        if (this.state.playingEpisode !== null) {
          this.setState({ playing: this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode) });
        }
      });
    });
    req.addEventListener('error', evt => {
      this.setState({ loading: false });
    });
    req.open('GET', path);//this.state.nextPage);
    req.send();
  }

  changeSeason (index) {
    if (index !== this.state.selectedSeason) {
      this.setState({
        selectedSeason: index,
        season: seasons[index],
      }, () => this.load(`/feed/temporada${seasons[this.state.selectedSeason].value}/podcast-1.xml`, true));
    }
  }

  togglePlay (episode) {
    //const episode = this.state.episodes.find(element => element.episode === key);
    // const ep = {
    //   filename: episode.file,
    //   title: episode.title,
    //   duration: episode.duration,
    // };
    this.player.current.togglePlay(episode, (err, data) => {
      if (err) {
        console.error('Error!');
      }
      if (data.type && data.type === 'progress' && this.state.progress !== data.progress) {
        this.setState({
          playing: episode,
          // playingEpisode: key,
          progress: data.progress,
        });
      } else if (data.type === 'stateChange') {
        this.setState({
          playing: episode,
          // playingEpisode: key,
          playerState: data.state,
        });
      } else if (data.type === 'end') {
        console.log(data)
        this.setState({
          playing: null,
          playerState: data.state,
        });
        // this.playNext();
      }
    });
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
    let loadMoreClassName = ['load-more'];
    if (this.state.loading) {
      loadMoreClassName.push('loading');
    }
    return (
      <>
        <PageHeader
          title="Preguntale a tu Madre"
          tagline="Donde no existen preguntas estúpidas…"
        />
        <section className="main-content">
          <div id="home">
            <Dropdown
              changeHandler={this.changeSeason}
              options={seasons}
              //value={this.state.season.value}
              value={this.state.selectedSeason}
            >
              <h1>{seasons[this.state.selectedSeason].text}</h1>
            </Dropdown>
            {/*<h1>Programas <sup><a href="/podcast.xml" target="_blank"><span className="rss"></span></a></sup></h1>*/}
            {this.state.episodes.map((episode, i) => {
              const current = this.state.playing && this.state.playing.slug === episode.slug;
              return (
                <Episode
                  key={i}
                  {...episode}
                  playerState={current ? this.state.playerState : 0 }
                  progress={current ? this.state.progress : 0 }
                  playHandler={() => this.togglePlay(episode)}
                  sharer={this.share.bind(null, episode.url, episode.title)}
                />
              )}
            )}
            {
              this.state.nextPage
              ? (
                <div className="pagination">
                  <button
                    className={ loadMoreClassName.join(' ') }
                    disabled={ this.state.loading }
                    onClick={ this.load }
                  >
                    { this.state.replaceList ? 'Listado de programas' : 'Programas anteriores' }
                  </button>
                </div>
              )
              : null
            }
          </div>
          <div className="sidebar">
            <div className="twitter-timeline-wrapper">
              <a className="twitter-timeline" href="https://twitter.com/preguntaleatum?ref_src=twsrc%5Etfw">Tweets de Preguntale a tu Madre</a>
            </div>
          </div>
        </section>
        <Player
          ref={this.player}
          episode={this.state.playing}
        />
      </>
    );
  }
}

export default App;
