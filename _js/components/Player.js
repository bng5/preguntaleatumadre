import React from 'react';

const player = (props) => (
  <div>
    <div className="player-controls__buttons">
      <button id="player-toggle" className="playback" onClick={ props.clickHandler }> </button>
    </div>
    <div>
      <em id="player-track-title" className="player-controls__title">Título</em>
      <span id="player-currentTime" className="player-time">{ props.currentTime }</span>
      <div className="range-slider range-slider--position">
        <div className="bar-holder">
          <div id="player-position-bar" className="bar"></div>
        </div>
        <input type="range" min="0" max="100" value="0" className="slider" id="player-position" />
      </div>
      <span id="player-endTime" className="player-time">{ props.endTime }</span>
      <span id="player-volume-indicator" className="player-volume-indicator"></span>
      <div className="range-slider range-slider--volume">
        <div className="bar-holder">
          <div id="player-volume-bar" className="bar"></div>
        </div>
        <input type="range" min="0" max="100" value="100" className="slider" id="player-volume" />
      </div>
    </div>
  </div>
);

export default player;
