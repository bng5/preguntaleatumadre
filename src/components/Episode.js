import React from 'react';
import {IDDLE, PLAYING, PAUSED, SEEKING} from '../constants';
// import { Link } from 'react-router-dom';

const share = (ev) => {
  const link = ev.target;
  try {
    const win = window.open(link.href, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    if (win) {
      ev.preventDefault();
    }
  } catch (err) {
    console.error(err);
  }
};

const durationText = duration => {
  const durationArr = duration.split(':').map(Number).reverse();
  let min = durationArr[0] > 30 ? 1 : 0;
  let h = 0;
  let text = [];
  if (durationArr.length > 1) {
    min += durationArr[1];
    if (durationArr.length > 2) {
      h += durationArr[2];
      text.push(`${h} h`);
    }
  }
  if (min) {
    text.push(`${min} min`);
  }
  return text.join(' y ');
};

const Episode = props => {
  const { duration, fecha, playHandler, playerState, title, path } = props;
  let { progress } = props;
  const url = encodeURIComponent(`https://www.preguntaleatumadre.com/programas${path}`);
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
      <h2 className="programa__titulo">{title}</h2>
      <p className="programa__meta">
        {durationText(duration)}
        <br />
        Emitido: <time>{ fecha }</time>
      </p>
      <p className="programa__share">
        Compartir en <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`}
          className="twitter"
          title="Twitter"
        ><span>Twitter</span></a>
        {' '}
        <a
          href={`http://www.facebook.com/sharer.php?u=${url}`}
          className="facebook"
          title="Facebook"
          onClick={share}
        ><span>Facebook</span></a>
      </p>
    </div>
  </div>
};
// <a href={ "/episodios/" + props.file }>Descargar</a>

export default Episode;
