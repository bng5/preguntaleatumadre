import React from 'react';

const Episode = (props) => (
  <div className="programa">
    <span className="programa__playback playback" data-src="/episodios/{ props.file }" data-title="{ props.title }" onClick={props.playHandler}></span>
    <h2 className="programa__titulo">{ props.title }</h2>
    <span>{ props.date }</span>
    { props.children }
    <a href={ "/episodios/" + props.file }>(?response-content-disposition=attachment) Descargar</a>
  </div>
);

export default Episode;
