import React, { Component } from 'react';
import { IDDLE, PLAYING, PAUSED, SEEKING } from '../constants';

const toTime = function (seconds) {
  var minutes = '0' + Math.floor(seconds / 60);
  var seconds = '0' + Math.floor(seconds - minutes * 60);
  return minutes.substr(-2) + ':' + seconds.substr(-2);
};

const volumeIcon = function (value) {
  return value == 0 ? 'off' : (value >= 80 ? 'up' : 'down');
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.playerEl = React.createRef();
    this.state = {
      currentTime: '0:00',
      // playerState: 0,
      episode: props.episode,
      progress: 0,
      volume: 0,
      started: false,
      error: false,
    };
    this.canPlay = this.canPlay.bind(this);
    this.ended = this.ended.bind(this);
    this.onError = this.onError.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlaying = this.onPlaying.bind(this);
    this.timeUpdate = this.timeUpdate.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.volumeControl = this.volumeControl.bind(this);
    this.waiting = this.waiting.bind(this);
  }

  componentDidMount() {
    this.setState({
      volume: (this.playerEl.current.volume * 100),
    });
  }

  canPlay () {
    console.log('canPlay')
    console.log(this.state.started)
    if (!this.state.started) {
      this.setState({
        started: true,
      }, () => {console.log(this.state.started)});
    }
  }

  togglePlay (episode) {
    if (!episode || !episode.file || episode.file === this.state.episode.file) {
      this.playerEl.current.paused ? this.playerEl.current.play() : this.playerEl.current.pause();
      return;
    }
    this.props.onUpdateState(null, {
      type: 'changeEpisode',
      episode,
    });
    this.setState({
      // playerState: 1,
      episode,
      progress: 0,
      started: true,
      error: false,
    }, () => {
      this.playerEl.current.play();
    });
  }

  timeUpdate() {
    const progress = (this.state.episode.duration && !isNaN(this.playerEl.current.duration)) ? Math.round(this.playerEl.current.currentTime * 100 / this.playerEl.current.duration) : 0;
    this.setState({
      currentTime: toTime(this.playerEl.current.currentTime),
      progress,
    });
    this.props.onUpdateState(null, {
      type: 'progress',
      progress
    });
  }

  ended() {
    this.props.onUpdateState(null, {
      type: 'end',
      progress: 0,
    });
  }

  volumeControl (event) {
    const volume = event.target.value;
    this.setState({ volume });
    this.playerEl.current.volume = (volume / 100);
  }

  positionControl(event) {
    const progress = event.target.value;
    this.setState({ progress });
    this.playerEl.current.currentTime = Math.round(progress * this.playerEl.current.duration / 100);
  }

  stateChange (state) {
    this.props.onUpdateState(null, {
      type: 'stateChange',
      state,
    });
  }

  waiting () {
    this.stateChange(SEEKING);
  }

  onPause () {
    this.stateChange(PAUSED);
  }

  onPlaying () {
    this.stateChange(PLAYING);
  }

  onError (ev) {
    if (!this.state.started) {
      this.setState(state => ({
        episode: {
          ...state.episode,
          file: '',
        }
      }));
    } else {
      this.setState({ error: true });
      this.stateChange(0);
    }
    console.error(ev.target.error);
  }

  render() {
    const playerClass = this.state.started ? 'show' : '';
    const toggleClass = ['playback'];
    if (this.playerEl.current) {
      if (!this.playerEl.current.error && !this.playerEl.current.paused) {
        toggleClass.push('pause');
      } else if (this.playerEl.current.seeking) {
        toggleClass.push('loading');
      }
    }
    return (
      <div id="player-controls" className={playerClass}>
        <div className="player-controls__buttons">
          <button
            className={toggleClass.join(' ')}
            onClick={this.togglePlay}
          > </button>
        </div>
        <div>
          <em className="player-controls__title">{ this.state.error ? <span style={{ color: '#c01010' }}>Sin transmisión disponible</span> : this.state.episode.title }</em>
          <span className="player-time">{ this.state.currentTime }</span>
          {(this.state.episode.slug !== 'radio') && (
            <div className="range-slider range-slider--position">
              <div className="bar-holder">
                <div className="bar" style={{ width: this.state.progress + '%' }}></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={this.state.progress}
                className="slider"
                onChange={this.positionControl.bind(this)}
                // onInput={this.positionControl.bind(this)}
              />
            </div>
          )}
          <span id="player-endTime" className="player-time">{ this.state.episode.duration }</span>
          <span className={"player-volume-indicator " + volumeIcon(this.state.volume)}></span>
          <div className="range-slider range-slider--volume">
            <div className="bar-holder">
              <div id="player-volume-bar" className="bar" style={{ width: this.state.volume + '%' }}></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              className="slider"
              //onInput={this.volumeControl.bind(this)}
              onChange={this.volumeControl}
            />
          </div>
        </div>
        <audio
          src={this.state.episode.file}
          type="audio/mpeg"
          ref={this.playerEl}
          onError={this.onError}
          onTimeUpdate={this.timeUpdate}
          onEnded={this.ended}
          onWaiting={this.waiting}
          onSeeking={this.waiting}
          //onPlay={() => console.log('play')}
          onPause={this.onPause}
          onPlaying={this.onPlaying}
          onCanPlay={this.canPlay}
          // onLoad={() => console.log('onLoad')}
          // onLoadedData={() => console.log('onLoadedData')}
        ></audio>
      </div>
    );
  }
}

export default Player;
