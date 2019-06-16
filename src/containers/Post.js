import React from 'react'
import { useRouteData } from 'react-static';
import { Helmet } from 'react-helmet';
import { Link } from 'components/Router';

export default function Post() {
  const { post } = useRouteData();
  return (
    <div id="home">
      <Helmet>
        <title>{post.title} - Preguntale a tu Madre</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:audio" content={post.file} />
      </Helmet>
      <h1>Programas <sup><a href="/podcast.xml" target="_blank"><span className="rss"></span></a></sup></h1>
      <div id="programas">
        <div className="programa">
          <p>Emitido: <time datetime={post.date}>{post.fecha}</time></p>
          <a href={`/episodios/${post.file}`}>{post.file}</a>
        </div>
        <div className="pagination">
          {/* % if page.previous %}
          Anterior: <a href="{{ page.previous.url }}">{{ page.previous.title }}</a>
          {% endif % */}
          <Link to="/">Listado de programas</Link>
          {/* % if page.next %}
          Siguiente: <a href="{{ page.next.url }}">{{ page.next.title }}</a>
          {% endif % */}
        </div>
      </div>
    </div>



  )
}

// <script id="data" type="application/json">{
//   "next_page":"/feed/podcast-1.xml",
//   "back": true,
//   "programas": [{
//     "title": "{{ page.title }}",
//     "file": "{{ page.file }}",
//     "fecha": "{{ page.fecha }}",
//     "date": "{{ page.date }}",
//     "length": {{ page.length }},
//     "episode": {{ page.episode }},
//     "duration": "{{ page.duration }}",
//     "url": "{{ page.url }}"
//   }]
// }</script>
