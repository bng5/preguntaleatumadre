import React from 'react';
import {IDDLE, PLAYING, PAUSED, SEEKING} from '../constants';

const Episode = ({ baseUrl, fecha, id, playHandler, playerState, progress, sharer, title }) => {
  const url = encodeURIComponent(`${baseUrl}${id}`);
  let buttonClass = ['programa__playback', 'playback'];
  if (playerState === PLAYING) {
    buttonClass.push('pause');
  } else if (playerState === SEEKING) {
    buttonClass.push('loading');
  }
  progress *= 1.8;
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
        <span className={buttonClass.join(' ')} onClick={playHandler}></span>
      </div>
    </div>
    <div className="programa__info">
      <h2 className="programa__titulo">{ title }</h2>
      <p className="programa__meta">
        Emitido: <time>{ fecha }</time>
      </p>
      <p className="programa__share">
        Compartir en <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`}
          className="twitter"
          title="Twitter"
          onClick={sharer}
        ><span>Twitter</span></a>
        {' '}
        <a
          href={`http://www.facebook.com/sharer.php?u=${url}`}
          className="facebook"
          title="Facebook"
          onClick={sharer}
        ><span>Facebook</span></a>
      </p>
    </div>
  </div>
};
// <a href={ "/episodios/" + props.file }>Descargar</a>

export default Episode;
