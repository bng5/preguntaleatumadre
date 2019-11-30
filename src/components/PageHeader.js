import React from 'react';
// import { Link } from 'components/Router';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';

import PodcastProviders from './PodcastProviders';
//import Logo from '../../assets/images/patum.svg';

class PageHeader extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      logo: '/assets/images/patum.svg',
      modalIsOpen: false,
      copied: false,
      showPodcast: false,
      formMessage: '',
      placeholder: '',
      sendingMessage: false,
      formStatus: 0,
    };

    this.inputUrl = React.createRef();
    this.inputMessage = React.createRef();

    this.changeLogo = this.changeLogo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.copyMouseOut = this.copyMouseOut.bind(this);
    this.copyText = this.copyText.bind(this);
    this.focusUrl = this.focusUrl.bind(this);
    this.openModal = this.openModal.bind(this);
    this.playRadio = this.playRadio.bind(this);
    this.setFormMessage = this.setFormMessage.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.togglePodcast = this.togglePodcast.bind(this);
  }

  componentDidMount () {
    const messages = [
      <code>{`01110000 01110101 01110100 01101111  00100000 01100101 01101100 00100000
01110001 01110101 01100101 00100000  01101100 01100101 01100101 00000000`}</code>,
      <code>01000011 01100001 01101001 01110011 01110100 01100101</code>,
      <p><a href="https://youtu.be/dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank" onClick={this.changeLogo}>Click acá</a></p>,
      // <p>Si vas a preguntar por los próximos números del 5 de oro, son: 4, 8, 15, 16, 23 extra 42</p>,
      <p>Si vas a preguntar por los próximos números del 5 de oro, son: <img src="https://www3.labanca.com.uy/assets/bolillas/oro/4.png" alt="4" /> <img src="https://www3.labanca.com.uy/assets/bolillas/oro/8.png" alt="8" /> <img src="https://www3.labanca.com.uy/assets/bolillas/oro/15.png" alt="15" /> <img src="https://www3.labanca.com.uy/assets/bolillas/oro/16.png" alt="16" /> <img src="https://www3.labanca.com.uy/assets/bolillas/oro/23.png" alt="23" /> extra <img src="https://www3.labanca.com.uy/assets/bolillas/oro/42.png" alt="42" /></p>,
      <p>Algunas de las preguntas pueden considerarse actos de guerra según los Convenios de Ginebra</p>,
      <p>Consejo: Siempre mira para los dos lados antes de enviar una pregunta</p>,
      <><blockquote>Nunca dije nada de lo que el internet dice que dije</blockquote> <p>Abraham Lincoln</p></>,
      <><blockquote>...Yo tengo un sueño, un sueño donde toda pregunta sea respondida los miércoles a las veintidos...</blockquote> <p>Martin Luther King Jr.</p></>,
      <p>Las preguntas pueden ser o no, legales dentro de los 193 países reconocidos por la ONU</p>,
      <p>"Nescio, ergo sum"</p>,
    ];
    this.setState({
      randomMessage: messages[Math.floor(Math.random() * messages.length)],
    });
  }

  changeLogo () {
    this.setState({ logo: 'https://media.giphy.com/media/LXONhtCmN32YU/giphy.gif' });
  }

  setFormMessage (event) {
    this.setState({ formMessage: event.target.value });
  }

  submitForm (ev) {
    ev.preventDefault();

    if (this.state.formMessage.trim().length === 0) {
      return false;
    }

    const { action } = ev.target;

    // var formData = new FormData();
    // formData.append('consulta', this.state.formMessage);

    this.setState({
      formStatus: 0,
      sendingMessage: true,
    });
    fetch(action, {
      method: 'POST',
      mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'X-Requested-With': 'XMLHttpRequest',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: `consulta=${encodeURIComponent(this.state.formMessage)}`,//formData,//JSON.stringify(data), // body data type must match "Content-Type" header
    })
    // .then(response => response.json())
    .then(() => {
      this.setState({
        formMessage: '',
        sendingMessage: false,
        formStatus: 1,
      });
    })// parses JSON response into native JavaScript objects
    .catch(err => {
      this.setState({
        sendingMessage: false,
        formStatus: 2,
      });
    });
  }

  openModal (ev) {
    ev.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  closeModal () {
    this.setState({ modalIsOpen: false });
  }

  focusUrl (ev) {
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

  playRadio () {
    this.props.togglePlay(this.props.episode);
  }

  togglePodcast () {
    this.setState(state => ({ showPodcast: !state.showPodcast }));
  }

  render () {
    const {
      current,
      episode,
      file,
      playerState,
      state,
      title,
      tagline
    } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <section className="page-header">
        <div className="header-title__top">
          <div className="header-title">
            <img src={this.state.logo} alt={title} />
            {/* <h2 className="project-tagline">{tagline}</h2> */}
          </div>

          <form
            method="post"
            action="https://8t002prw85.execute-api.us-east-1.amazonaws.com/prod/contacto"
            onSubmit={this.submitForm}
          >
            <fieldset className="contact">
              <div className="contact-message">
                {this.state.randomMessage}
              </div>
              <textarea
                name="consulta"
                cols="70"
                rows="8"
                ref={this.inputMessage}
                placeholder="Escribí tu pregunta acá"
                value={this.state.formMessage}
                onChange={this.setFormMessage}
              /><br />
              {!!this.state.formStatus && (
                <p>{['', 'Mensaje enviado correctamente', 'Error. No fue posible enviar la pregunta'][this.state.formStatus]}</p>
              )}
              <input type="submit" value={this.state.sendingMessage ? 'Enviando…' : (this.state.formStatus === 1 ? 'Enviar otra pregunta' : 'Enviar pregunta')} className="btn btn--primary" disabled={this.state.sendingMessage} />
            </fieldset>
          </form>

          <div className="header-ctas">
            <ul className="header-ctas-list">
              {/* <li><a type="button" onClick={this.togglePodcast} className={'btn header-ctas-list__item podcast' + (this.state.showPodcast ? ' active' : '')}>Podcast</a></li> */}
              <li><a type="button" onClick={this.openModal} className={'btn header-ctas-list__item podcast' + (this.state.showPodcast ? ' active' : '')}>Podcast</a></li>
              <li><a type="button" onClick={this.playRadio} className={'btn header-ctas-list__item radio ' + (playerState !== null ? ['play', 'pause', 'play', 'loading'][playerState] : '')}>Radio en vivo</a></li>
            </ul>
          </div>
          <Modal open={modalIsOpen} onClose={this.closeModal} classNames={{ modal: 'podcast-subscription', closeIcon: 'podcast-subscription__close-icon' }} center showCloseIcon={true}>
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
              <PodcastProviders />
          </Modal>
        </div>
        <p className="page-header__cuando">Miércoles 22 hs. por <a href="http://www.mediarte.com.uy/" rel="noopener noreferrer" target="_blank">Mediarte</a></p>
        <ul className="social">
          <li className="social-item twitter"><a href="https://twitter.com/preguntaleatum" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
          <li className="social-item instagram"><a href="https://www.instagram.com/patumradio/" rel="noopener noreferrer" target="_blank">@patumradio</a></li>
          <li className="social-item facebook"><a href="https://www.facebook.com/2036459399960596/" rel="noopener noreferrer" target="_blank">Preguntale A Tu Madre</a></li>
          {/* <li className="social-item whatsapp"><a href="https://wa.me/59892633427" rel="noopener noreferrer" target="_blank">+598 92 633 427</a></li> */}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const current = (state.slug === 'radio');
  const playerState = current ? state.state : 0;
  return {
    current,
    playerState,
  };
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
