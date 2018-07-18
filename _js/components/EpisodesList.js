import React from 'react';
import Episode from './Episode';
import {IDDLE, PLAYING, PAUSED, SEEKING} from '../constants';

class EpisodesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: props.episodes,
      playerState: 0,
      playing: null,
      progress: 0,
    };
    this.playing = null;
  }

  togglePlay(key) {
    const episode = this.state.episodes[key];
    const ep = {
      filename: `/episodios/${episode.file}`,// FIXME https://www.preguntaleatumadre.com
      title: episode.title,
      duration: episode.duration,
    };
    this.props.player.togglePlay(ep, (err, data) => {
      if (err) {
        console.log('Error!');
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

  share(path, site) {
    const { protocol, host } = document.location;
    const url = encodeURIComponent(`${protocol}//${host}${path}`);
    const sites = {
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      facebook: `http://www.facebook.com/sharer.php?u=${url}`,
    };
    window.open(sites[site], 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  render() {
    return this.state.episodes.map((episode, i) => (
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
        sharer={this.share.bind(this, episode.url)}
      ></Episode>
    ));
  }
}

export default EpisodesList;
