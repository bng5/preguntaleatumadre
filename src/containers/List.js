import React from 'react';
import { useRouteData } from 'react-static';
import { Link } from 'components/Router';
import { TwitterTimelineEmbed } from 'react-twitter-embed';


import Dropdown from '../components/Dropdown';
import Episode from '../components/Episode';

export default () => {
  const { posts, seasons, selectedSeason } = useRouteData();
  return (
    <React.Fragment>
      <div id="home">
        <Dropdown
          // changeHandler={this.changeSeason}
          options={seasons}
          value={selectedSeason}
        >
          <h1>Temporada {selectedSeason}</h1>
        </Dropdown>
        {posts.map((episode, i) => {
          //const current = this.state.playing && this.state.playing.slug === episode.slug;
          return (
            <Episode
              key={episode.id}
              {...episode}
              //playerState={current ? this.state.playerState : 0 }
              //progress={current ? this.state.progress : 0 }
              //playHandler={() => this.togglePlay(episode)}
              //sharer={this.share.bind(null, episode.url, episode.title)}
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
      <div className="sidebar">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="preguntaleatum"
          options={{ height: 1024 }}
        />
        {/*
        <div className="twitter-timeline-wrapper">
          <a className="twitter-timeline" href="https://twitter.com/preguntaleatum?ref_src=twsrc%5Etfw">Tweets de Preguntale a tu Madre</a>
        </div>
        */}
      </div>

      {/*<p>{currentPage} - {totalPages}</p>*/}

    </React.Fragment>
  )
};
