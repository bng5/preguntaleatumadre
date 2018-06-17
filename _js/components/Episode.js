import React from 'react';
import {IDDLE, PLAYING, PAUSED, SEEKING} from '../constants';

const Episode = (props) => {
  let buttonClass = ['programa__playback', 'playback'];
  if (props.playerState === PLAYING) {
    buttonClass.push('pause');
  } else if (props.playerState === SEEKING) {
    buttonClass.push('loading');
  }
  const progress = (1.8 * props.progress);
  return <div className="programa">
    <div className="radial-progress">
      <div className="circle">
        <div className="mask full" style={{ transform: `rotate(${progress}deg)` }}>
          <div className="fill" style={{ transform: `rotate(${progress}deg)` }}></div>
        </div>
        <div className="mask half">
          <div className="fill" style={{ transform: `rotate(${progress}deg)` }}></div>
          <div className="fill fix" style={{ transform: `rotate(${(progress * 2)}deg)` }}></div>
        </div>
        <div className="shadow"></div>
      </div>
      <div className="inset">
        <span className={buttonClass.join(' ')} onClick={props.playHandler}></span>
      </div>
    </div>
    <h2 className="programa__titulo">{ props.title }</h2>
    <p className="programa__info">
      Programa { props.episode }<br />
      Emitido: <time>{ props.fecha }</time>
    </p>
    { props.children }
  </div>
};
// <a href={ "/episodios/" + props.file }>Descargar</a>

export default Episode;
