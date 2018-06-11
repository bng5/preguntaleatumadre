import React from 'react';

const toTime = function (seconds) {
  var minutes = '0' + Math.floor(seconds / 60);
  var seconds = '0' + Math.floor(seconds - minutes * 60);
  return minutes.substr(-2) + ':' + seconds.substr(-2);
};

const volumeIcon = function (value) {
  return value == 0 ? 'off' : (value >= 80 ? 'up' : 'down');
};

const IDDLE   = 0;
const PLAYING = 1;
const PAUSED  = 2;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerEl = null;
    this.state = {
      currentTime: '0:00',
      endTime: '0:00',
      playerState: 0,
      playerSrc: '',
      title: '',
      progress: 0,
      volume: 0,
    };
    this.timeUpdate = this.timeUpdate.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.callback = null;
  }

  componentDidMount() {
    this.setState({
      volume: (this.playerEl.volume * 100),
    });
  }

  togglePlay(episode, callback) {
    // playerControls.classList.add('show');
    if (!episode || !episode.filename || episode.filename === this.state.playerSrc) {
      this.playerEl.paused ? this.playerEl.play() : this.playerEl.pause();
      return;
    }
    this.setState({
      playerState: 1,
      playerSrc: episode.filename,
      title: episode.title,
      endTime: episode.duration,
      progress: 0,
    }, () => {
      this.playerEl.play();
    });
    this.callback = callback;
    // if (toggleButton) {
    //   toggleButton.classList.remove('pause');
    // }
    // toggleButton = button;
    // document.getElementById('player-track-title').innerText = button.dataset.title;
    // player.src = src;
  }

  timeUpdate() {
    const progress = Math.round(this.playerEl.currentTime * 100 / this.playerEl.duration);
    this.setState({
      currentTime: toTime(this.playerEl.currentTime),
      progress,
    });
    this.callback(null, {
      type: 'progress',
      progress
    });
    // var value = Math.round(this.playerEl.currentTime * 100 / this.playerEl.duration);
    // positionControl.value = value;
    // positionControlBar.style.width = value + '%';
  }

  ended() {
    console.log('ended');
  }

  volumeControl(event) {
    const val = event.target.value;
    this.setState({
      volume: val
    });
    this.playerEl.volume = (val / 100);
  }

  positionControl(event) {
    this.playerEl.currentTime = Math.round(event.target.value * this.playerEl.duration / 100);
  }

  render() {
    const playerClass = this.state.playerState !== 0 ? 'show' : '';
    const toggleClass = ['playback'];
    if (this.playerEl && !this.playerEl.paused) {
      toggleClass.push('pause');
    }
// playerVolumeIndicator.classList.add(volumeIcon(vol));
    return (
      <div id="player-controls" className={playerClass}>
        <div className="player-controls__buttons">
          <button id="player-toggle" className={toggleClass.join(' ')} onClick={() => this.togglePlay() }> </button>
        </div>
        <div>
          <em id="player-track-title" className="player-controls__title">{ this.state.title }</em>
          <span id="player-currentTime" className="player-time">{ this.state.currentTime }</span>
          <div className="range-slider range-slider--position">
            <div className="bar-holder">
              <div id="player-position-bar" className="bar" style={{ width: this.state.progress + '%' }}></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.progress}
              className="slider"
              onInput={this.positionControl.bind(this)}
              id="player-position"
            />
          </div>
          <span id="player-endTime" className="player-time">{ this.state.endTime }</span>
          <span id="player-volume-indicator" className={"player-volume-indicator " + volumeIcon(this.state.volume)}></span>
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
              onInput={this.volumeControl.bind(this)}
            />
          </div>
        </div>
        <audio
          src={this.state.playerSrc}
          type="audio/mpeg"
          ref={audio => this.playerEl = audio}
          onError={(error) => console.log(this.playerEl.error)}
          onTimeUpdate={this.timeUpdate}
          onEnded={this.ended}
          onWaiting={() => console.log('waiting')}
          onSeeking={() => console.log('seeking')}
          onPlay={() => console.log('play')}
          onPause={() => this.callback(null, {type: 'stateChange', state: PAUSED})}
          onPlaying={() => this.callback(null, {type: 'stateChange', state: PLAYING})}
        ></audio>
      </div>
    );
  }
}

export default Player;
