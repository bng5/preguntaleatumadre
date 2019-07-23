import React from 'react'
import { Head, useRouteData, useSiteData } from 'react-static';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Episode from '../components/Episode';

const Post = ({ player, togglePlay }) => {
  const { title } = useSiteData();
  const { next, post, previous } = useRouteData();
  const current = player.slug === post.slug;
  return (
    <div id="home">
      <Head>
        <title>{post.title} - {title}</title>
        {/* <meta name="twitter:card" content="player" /> */}
        <meta name="twitter:title" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:audio" content={post.file} />
      </Head>
      {/* <h1>Programas <sup><a href="/podcast.xml" target="_blank"><span className="rss"></span></a></sup></h1> */}
      <div id="programas">
        <Episode
          key={post.id}
          {...post}
          playerState={current ? player.state : 0 }
          progress={current ? player.progress : 0 }
          playHandler={() => togglePlay(post)}
        />
        <ul className="pagination">
          <li>{previous && <Link to={`/programas${previous.path}`}><span title="Anterior">←</span> {previous.title}</Link>}</li>
          <li><Link to="/">Listado de programas</Link></li>
          <li>{next && <Link to={`/programas${next.path}`}>{next.title} <span title="Siguiente">→</span></Link>}</li>
        </ul>
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

const mapStateToProps = (state) => {
  return {
    player: state,
  }
};

const mapDispatchToProps = (dispatch) => ({
  togglePlay: (episode) => {
    dispatch({
      type: 'TOGGLE_PLAY',
      ...episode,
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
