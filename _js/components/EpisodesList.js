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
      loadMore: true//props.loadMore,
    };
    this.playing = null;
    this.load = this.load.bind(this);
  }

  load() {
    fetch('/podcast.xml')
    .then(response => response.text())
    .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
    .then(data => {
      window.rdata = data;
      let episodes = this.state.episodes;
      const items = data.getElementsByTagName('item');
      for (let i = 0; i < items.length; i++) {
        let rssItem = items.item(i);
        let enclosure = rssItem.getElementsByTagName('enclosure')[0];
        window.idata = rssItem;
        episodes.push({
          title: rssItem.getElementsByTagName('title')[0].firstChild.nodeValue,
          date: "2018-01-01 00:00:00 -0300",
          duration: rssItem.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', 'duration'),
          episode: rssItem.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', 'episode'),
          fecha: "0 de julio, 2018",
          file: "file",
          length: enclosure.getAttribute('length'),
          url: enclosure.getAttribute('url'),
        });
  // <item>
  //  <pubDate>Wed, 18 Jul 2018 10:40:00 -0300</pubDate>
  //  <category>Podcast</category>
  //  <guid isPermaLink="true">http://0.0.0.0:4000/episodios/patum-2018-07-11.mp3</guid>
  //  <enclosure url="http://0.0.0.0:4000/episodios/patum-2018-07-11.mp3" length="51649877" type="audio/mpeg" />
  //  <itunes:duration>53:48</itunes:duration>
  //  <itunes:explicit>clean</itunes:explicit>
  // </item>
      }
      this.setState({ episodes });
    })
    .catch(err => console.error(err));
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

  share(path, title, site) {
    const { protocol, host } = document.location;
    const url = encodeURIComponent(`${protocol}//${host}${path}`);
    const sites = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
      facebook: `http://www.facebook.com/sharer.php?u=${url}`,
    };
    window.open(sites[site], 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  render() {
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
          this.state.loadMore
            ? <div className="pagination" onClick={ this.load }><button>pagination</button></div>
            : null
        }
      </div>);
  }
}

export default EpisodesList;
