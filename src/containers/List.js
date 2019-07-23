import React from 'react';
import { Head, useRouteData, useSiteData } from 'react-static';
import { connect } from 'react-redux';
// import { Link } from 'components/Router';
// import { TwitterTimelineEmbed } from 'react-twitter-embed';

import Dropdown from '../components/Dropdown';
import Episode from '../components/Episode';

const EpisodesList = ({ player, togglePlay }) => {
  // const { protocol, host } = document.location;
  // const baseUrl = `${protocol}//${host}/`;
  const { title } = useSiteData();
  const { posts, seasons, selectedSeason } = useRouteData();
  // if (player.state === 2) {
  //   const index = posts.findIndex(post => post.slug === player.slug);
  //   console.log(index)
  //   console.log(player.slug)
  //   console.log(posts)
  //   if (index > -1 && posts[index + 1]) {
  //     togglePlay(posts[index + 1]);
  //   }
  // }
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta property="og:title" content={title} />
      </Head>
      <div id="home">
        <Dropdown
          // changeHandler={this.changeSeason}
          options={seasons}
          value={selectedSeason}
        >
          <h1>Temporada {selectedSeason}</h1>
        </Dropdown>
        {posts.map(episode => {
          const current = player.slug === episode.slug;
          return (
            <Episode
              key={episode.id}
              {...episode}
              playerState={current ? player.state : 0 }
              progress={current ? player.progress : 0 }
              playHandler={() => togglePlay(episode)}
            />
          )}
        )}
        {/*
          this.state.nextPage
          ? (
            <div className="pagination">
              <button
                className={ loadMoreClassName.join(' ') }
                disabled={ this.state.loading }
                onClick={ this.load }
              >
                { this.state.replaceList ? 'Listado de programas' : 'Programas anteriores' }
              </button>
            </div>
          )
          : null
        */}
      </div>
      {/*<p>{currentPage} - {totalPages}</p>*/}

    </React.Fragment>
  )
}
// }

const mapStateToProps = (state) => {
  return {
    player: state,
  // todos: getVisibleTodos(state.todos, state.visibilityFilter)
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
)(EpisodesList);
// export default EpisodesList;
