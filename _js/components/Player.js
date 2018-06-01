import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      currentTime: '0:00',
      endTime: '0:00',
      playerState: 0,
      playerSrc: '',
      title: '',
    };
  }
  
  togglePlay(filename, title, duration) {
    // playerControls.classList.add('show');
    if (filename === this.state.playerSrc) {
      this.player.paused ? this.player.play() : this.player.pause();
      return;
    }
    this.setState({
      playerSrc: filename,
      title: title,
      endTime: duration,
    });
    return;
    if (toggleButton) {
      toggleButton.classList.remove('pause');
    }
    toggleButton = button;
    document.getElementById('player-track-title').innerText = button.dataset.title;
    player.src = src;
    player.play();

  }

  render() {
    return (
      <div>
        <div className="player-controls__buttons">
          <button id="player-toggle" className="playback" onClick={ this.props.clickHandler }> </button>
        </div>
        <div>
          <em id="player-track-title" className="player-controls__title">{ this.state.title }</em>
          <span id="player-currentTime" className="player-time">{ this.state.currentTime }</span>
          <div className="range-slider range-slider--position">
            <div className="bar-holder">
              <div id="player-position-bar" className="bar"></div>
            </div>
            <input type="range" min="0" max="100" value="0" readOnly className="slider" id="player-position" />
          </div>
          <span id="player-endTime" className="player-time">{ this.state.endTime }</span>
          <span id="player-volume-indicator" className="player-volume-indicator"></span>
          <div className="range-slider range-slider--volume">
            <div className="bar-holder">
              <div id="player-volume-bar" className="bar"></div>
            </div>
            <input type="range" min="0" max="100" value="100" className="slider" readOnly id="player-volume" />
          </div>
        </div>
        <audio id="player" src={this.state.playerSrc} type="audio/mpeg" ref={audio => this.player = audio}></audio>
      </div>
    );
  }
}

export default Player;
