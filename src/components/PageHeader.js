import React from 'react';
// import { Link } from 'components/Router';
import Modal from 'react-modal';
import { connect } from 'react-redux';

//import Logo from '../../assets/images/patum.svg';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

Modal.setAppElement('#root');

class PageHeader extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      copied: false,
      showPodcast: false,
    };

    this.inputUrl = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.copyMouseOut = this.copyMouseOut.bind(this);
    this.copyText = this.copyText.bind(this);
    this.focusUrl = this.focusUrl.bind(this);
    this.openModal = this.openModal.bind(this);
    this.playRadio = this.playRadio.bind(this);
    this.togglePodcast = this.togglePodcast.bind(this);
  }

  openModal (ev) {
    ev.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  focusUrl (ev) {
    console.log('focusUrl')
    ev.target.select();
  }

  copyText () {
    this.inputUrl.current.select();
    document.execCommand('copy');
    // this.setState({ copied: true }, () => window.setTimeout(() => this.setState({ copied: false }), 5000));
    this.setState({ copied: true });
  }

  copyMouseOut () {
    this.setState({ copied: false });
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  playRadio () {
    this.props.togglePlay(this.props.episode);
  }

  togglePodcast () {
    this.setState(state => ({ showPodcast: !state.showPodcast }));
  }

  render () {
    const { episode, file, state, title, tagline } = this.props;
    const playerState = (file === episode.file) ? state : 0;
    return (
      <section className="page-header">
        <div className="header-title__top">
          <div className="header-title">
            <img src="/assets/images/patum.svg" alt={title} />
            <h2 className="project-tagline">{tagline}</h2>
          </div>
          <div className="header-ctas">
            <ul className="header-ctas-list">
              <li><a type="button" onClick={this.togglePodcast} className={'btn header-ctas-list__item podcast' + (this.state.showPodcast ? ' active' : '')}>Podcast</a></li>
              <li><a type="button" onClick={this.playRadio} className={'btn header-ctas-list__item radio ' + (playerState !== null ? ['play', 'pause', 'play', 'loading'][playerState] : '')}>Radio en vivo</a></li>
            </ul>
            {
            this.state.showPodcast && (
              <div className="podcast-subscription">
                {/*
                <div>
                  <h3>Suscribirse al Podcast</h3>
                  <button onClick={this.togglePodcast} className="icon-btn close"><span className="label">Cerrar</span></button>
                  </div>
                */}
                <h3>Suscribirse al Podcast</h3>
                <p className="feed-url">
                  <span className="tooltip">
                    <button onClick={this.copyText} onMouseOut={this.copyMouseOut} className="icon-btn copy">
                      <span className="tooltiptext">{this.state.copied ? 'Copiado' : 'Copiar ruta'}</span>
                      <span className="label">Copiar</span>
                    </button>
                  </span>
                  <input
                    ref={this.inputUrl}
                    type="text"
                    value="https://www.preguntaleatumadre.com/podcast.xml"
                    readOnly
                    onFocus={this.focusUrl}
                  />
                </p>
                <p>Copiá la ruta del feed para agregarla en tu reproductor de podcast o seleccioná uno de los siguientes servicios.</p>
                <ul className="podcast-providers">
                  <li><a href="https://itunes.apple.com/uy/podcast/preguntale-a-tu-madre/id1384328001" className="btn header-ctas-list__item" target="_blank">iTunes</a></li>
                  <li><a href="http://tun.in/pi5TW" className="btn header-ctas-list__item" target="_blank">TuneIn</a></li>
                  <li><a href="https://player.fm/series/preguntale-a-tu-madre" className="btn header-ctas-list__item" target="_blank">PlayerFM</a></li>
                  <li><a href="https://www.ivoox.com/escuchar-preguntale-a-tu-madre_nq_531023_1.html" className="btn header-ctas-list__item" target="_blank">iVoox</a></li>
                </ul>
              </div>
            )
          }
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
  }
}

const mapStateToProps = (state) => {
  return state;
 //  return {
 //    currentPlay: state.currentPlay,
 //  // todos: getVisibleTodos(state.todos, state.visibilityFilter)
 // }
};

const mapDispatchToProps = (dispatch) => ({
  togglePlay: (episode) => {
    dispatch({
      type: 'TOGGLE_PLAY',
      ...episode,
    })
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);
