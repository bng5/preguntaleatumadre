import React from 'react';
import Episode from './Episode';
import { IDDLE, PLAYING, PAUSED, SEEKING } from '../constants';

const xmlns = {
  ATOM: 'http://www.w3.org/2005/Atom',
  ITUNES: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
  PATUM: 'http://www.preguntaleatumadre.com/Feed',
};

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

class EpisodesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: props.episodes,
      playerState: 0,
      playing: null,
      progress: 0,
      // loadMore: true,//props.loadMore,
      nextPage: props.nextPage,
      replaceList: props.replaceList,
      loading: false,
    };
    this.playing = null;
    this.load = this.load.bind(this);
  }

  load() {
    this.setState({ loading: true });
    var req = new XMLHttpRequest();
    req.addEventListener('load', evt => {
      const data = evt.target.responseXML;
      if (!data) {
        this.setState({ loading: false });
        return;
      }
      if (this.state.replaceList) {
        const historyState = this.state.episodes[0];
        window.history.replaceState(historyState, document.title, document.location.pathname);
        const title = 'Preguntale a tu Madre';
        window.history.pushState({}, title, '/');
        document.title = title;
      }
      let newState = {
        loading: false,
        episodes: this.state.replaceList ? [] : this.state.episodes,
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
        });
      }
      const links = data.getElementsByTagNameNS(xmlns.ATOM, 'link');
      for (let i = 0; i < links.length; i++) {
        let link = links.item(i);
        if (link.getAttribute('rel') === 'next') {
          newState.nextPage = link.getAttribute('href');
          break;
        }
      }
      this.setState(newState);
    });
    req.addEventListener('error', evt => {
      this.setState({ loading: false });
    });
    req.open('GET', this.state.nextPage);
    req.send();
  }

  togglePlay(key) {
    const episode = this.state.episodes[key];
    const ep = {
      filename: episode.file,
      title: episode.title,
      duration: episode.duration,
    };
    this.props.player.togglePlay(ep, (err, data) => {
      if (err) {
        console.error('Error!');
      }
      if (data.type && data.type === 'progress' && this.state.progress !== data.progress) {
        this.setState({
          playing: key,
          progress: data.progress,
        });
      } else if (data.type === 'stateChange') {
        console.log(`stateChange ${data.state}`);
        this.setState({
          playing: key,
          playerState: data.state,
        });
      }
    });
  }

  share(path, title, site) {
    const { protocol, host } = document.location;
    const url = encodeURIComponent(`${protocol}//${host}${path}`);
    const sites = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
      facebook: `http://www.facebook.com/sharer.php?u=${url}`,
    };
    window.open(sites[site], 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  setEpisodes(episodes) {
    this.setState({ episodes });
  }

  render() {
    let loadMoreClassName = ['load-more'];
    if (this.state.loading) {
      loadMoreClassName.push('loading');
    }
    return (
      <div>
        {this.state.episodes.map((episode, i) => (
          <Episode
            key={ i }
            playerState={ this.state.playing === i ? this.state.playerState : 0 }
            progress={ this.state.playing === i ? this.state.progress : 0 }
            title={ episode.title }
            file={ episode.file }
            date={ episode.date }
            duration={ episode.duration }
            episode={ episode.episode }
            fecha={ episode.fecha }
            length={ episode.length }
            playHandler={this.togglePlay.bind(this, i)}
            sharer={this.share.bind(this, episode.url, episode.title)}
          ></Episode>
        ))}
        {
          this.state.nextPage
            ? (
              <div className="pagination">
                <button className={ loadMoreClassName.join(' ') } disabled={ this.state.loading } onClick={ this.load }>{ this.state.replaceList ? 'Volver al listado' : 'Programas anteriores' }</button>
              </div>
            )
            : null
        }
      </div>);
  }
}

export default EpisodesList;
