import React, { Component } from 'react';

import PageHeader from './PageHeader';
import EpisodesList from './EpisodesList';
import Player from './Player';
import Dropdown from './Dropdown';

const seasons = [
  { value: 2, text: 'Temporada 2' },
  { value: 1, text: 'Temporada 1' },
];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      episodes: props.episodes,
      playing: null,
      season: seasons[0],
      selectedSeason: 0,
    };
    this.changeSeason = this.changeSeason.bind(this);
  }

  changeSeason (index) {
    if (index !== this.state.selectedSeason) {
      this.setState({ selectedSeason: index }, () => this.load());
    } 
  }

  load() {
    this.setState({ loading: true });
    var req = new XMLHttpRequest();
    req.addEventListener('load', evt => {
      const data = evt.target.responseXML;
      console.log(data);
      // if (!data) {
      //   this.setState({ loading: false });
      //   return;
      // }
      // if (this.state.replaceList) {
      //   const historyState = {
      //     episodes: this.state.episodes[0],
      //     nextPage: this.state.nextPage,
      //     playing: this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode),
      //   };
      //   window.history.replaceState(historyState, document.title, document.location.pathname);
      //   const title = 'Preguntale a tu Madre';
      //   window.history.pushState({}, title, '/');
      //   document.title = title;
      // }
      // let newState = {
      //   loading: false,
      //   episodes: this.state.replaceList ? [] : this.state.episodes,
      //   nextPage: null,
      //   replaceList: false,
      // };
      // const items = data.getElementsByTagName('item');
      // for (let i = 0; i < items.length; i++) {
      //   let rssItem = items.item(i);
      //   let enclosure = rssItem.getElementsByTagName('enclosure').item(0);
      //   let date = new Date(rssItem.getElementsByTagNameNS(xmlns.PATUM, 'date').item(0).firstChild.nodeValue);
      //   newState.episodes.push({
      //     title: rssItem.getElementsByTagName('title').item(0).firstChild.nodeValue,
      //     duration: rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'duration').item(0).firstChild.nodeValue,
      //     episode: parseInt(rssItem.getElementsByTagNameNS(xmlns.ITUNES, 'episode').item(0).firstChild.nodeValue),
      //     fecha: ` ${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`,
      //     file: enclosure.getAttribute('url'),
      //     length: parseInt(enclosure.getAttribute('length')),
      //     url: rssItem.getElementsByTagName('link').item(0).firstChild.nodeValue,
      //   });
      // }
      // const links = data.getElementsByTagNameNS(xmlns.ATOM, 'link');
      // for (let i = 0; i < links.length; i++) {
      //   let link = links.item(i);
      //   if (link.getAttribute('rel') === 'next') {
      //     newState.nextPage = link.getAttribute('href');
      //     break;
      //   }
      // }
      // this.setState(newState, () => {
      //   if (this.state.playingEpisode !== null) {
      //     this.setState({ playing: this.state.episodes.findIndex(element => element.episode === this.state.playingEpisode) });
      //   }
      // });
    });
    req.addEventListener('error', evt => {
      this.setState({ loading: false });
      console.log('error')
    });
    req.open('GET', '/feed/temporada1/podcast-1.xml');
    req.send();
  }

  render () {
    const { episodes } = this.state;
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
            <h1>Programas <sup><a href="/podcast.xml" target="_blank"><span className="rss"></span></a></sup></h1>
            <EpisodesList
              //player={playerInstance}
              episodes={episodes.programas}
              replaceList={ episodes.back === true }
              nextPage={episodes.next_page}
            />
          </div>
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
