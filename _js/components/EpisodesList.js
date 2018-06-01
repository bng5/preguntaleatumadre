import React from 'react';
import Episode from './Episode';

class EpisodesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: props.episodes,
      playerState: 0,
    };
  }

  togglePlay(file, title, duration) {
    console.log('EpisodesList togglePlay');
    this.props.player.togglePlay('/episodios/' + file, title, duration);
  }

  render() {
    return this.state.episodes.map(episode => (
      <Episode
        key={ episode.date }
        title={ episode.title }
        file={ episode.file }
        date={ episode.date }
        duration={ episode.duration }
        episode={ episode.episode }
        fecha={ episode.fecha }
        length={ episode.length }
        playHandler={this.togglePlay.bind(this, episode.file, episode.title, episode.duration)}
      ></Episode>
    ));
  }
}

export default EpisodesList;
