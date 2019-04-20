import React from 'react';

export default ({ title, tagline }) => (
  <section className="page-header">
    <div className="header-title__top">
      <div className="header-title">
        <img src="/assets/images/patum.svg" alt={title} />
        <h2 className="project-tagline">{tagline}</h2>
      </div>
    </div>
    <p className="page-header__cuando">Miércoles 22 hs. por <a href="http://www.mediarte.com.uy/" rel="noopener noreferrer" target="_blank">Mediarte</a></p>
    <ul className="social">
      <li className="social-item twitter"><a href="https://twitter.com/preguntaleatum" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
      <li className="social-item instagram"><a href="https://www.instagram.com/patumradio/" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
      <li className="social-item facebook"><a href="https://www.facebook.com/2036459399960596/" rel="noopener noreferrer" target="_blank">Preguntale A Tu Madre</a></li>
    </ul>
  </section>
);
