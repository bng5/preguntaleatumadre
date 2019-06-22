import React from 'react';
// import { Link } from 'components/Router';
import Modal from 'react-modal';

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
    };

    this.inputUrl = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.copyText = this.copyText.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal (ev) {
    ev.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  copyText () {
    this.inputUrl.current.select();
    document.execCommand('copy');
    this.setState({ copied: true }, () => window.setTimeout(() => this.setState({ copied: false }), 5000));
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  render () {
    const { title, tagline, togglePlay, playerState } = this.props;
    return (
      <section className="page-header">
        <div className="header-title__top">
          <div className="header-title">
            <img src="/assets/images/patum.svg" alt={title} />
            <h2 className="project-tagline">{tagline}</h2>
          </div>
          <div className="header-ctas">
            <ul className="header-ctas-list">
              <li><a type="button" onClick={this.openModal} href="/podcast.xml" className="btn header-ctas-list__item podcast">Podcast</a></li>
              <li><a type="button" onClick={togglePlay} className={'btn header-ctas-list__item radio ' + (playerState !== null ? ['play', 'pause', 'play', 'loading'][playerState] : '')}>Radio en vivo</a></li>
            </ul>
          </div>
        </div>
        <p className="page-header__cuando">Miércoles 22 hs. por <a href="http://www.mediarte.com.uy/" rel="noopener noreferrer" target="_blank">Mediarte</a></p>
        <ul className="social">
          <li className="social-item twitter"><a href="https://twitter.com/preguntaleatum" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
          <li className="social-item instagram"><a href="https://www.instagram.com/patumradio/" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
          <li className="social-item facebook"><a href="https://www.facebook.com/2036459399960596/" rel="noopener noreferrer" target="_blank">Preguntale A Tu Madre</a></li>
        </ul>
        <Modal
          isOpen={this.state.modalIsOpen}
          //onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          //style={customStyles}
          contentLabel="Suscribirse al Podcast"
        >
          <button onClick={this.closeModal}>close</button>
          <input
            ref={this.inputUrl}
            type="text"
            value="https://www.preguntaleatumadre.com/podcast.xml"
            readOnly
          />
          <button onClick={this.copyText}>Copiar</button> {this.state.copied && <span>Copiado</span>}
          <ul>
            <li><a href="https://itunes.apple.com/uy/podcast/preguntale-a-tu-madre/id1384328001">itunes</a></li>
            <li><a href="http://tun.in/pi5TW">tunein</a></li>
            <li><a href="https://player.fm/series/preguntale-a-tu-madre">playerfm</a></li>
            <li><a href="https://www.ivoox.com/escuchar-preguntale-a-tu-madre_nq_531023_1.html">ivoox</a></li>
          </ul>
        </Modal>
      </section>
    );
  }
}

export default PageHeader;
