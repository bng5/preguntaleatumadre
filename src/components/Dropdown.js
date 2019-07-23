import React, { Component } from 'react';
// import { Link } from 'components/Router';
import { Link } from 'react-router-dom';

const clickListener = next => {
  const func = () => {
    next();
    document.removeEventListener('click', func);
  }
  return func;
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      title: this.props.title
    }
    this.icon = props.icon || null;
    this.toggleList = this.toggleList.bind(this);
    this.openList = this.openList.bind(this);
  }

  openList () {
    if (!this.state.listOpen) {
      this.toggleList();
    }
  }

  toggleList () {
    const listOpen = !this.state.listOpen;
    if (listOpen) {
      document.addEventListener('click', clickListener(this.toggleList));
    }
    this.setState({
      listOpen
    });
  }

  render () {
    const { children, options, changeHandler, value } = this.props;
    const{ listOpen } = this.state
    return (
      <div className={'dropdown-wrapper' + (listOpen ? ' dropdown-wrapper--active' : '')}>
        <div className="dropdown-header" onClick={this.openList}>
          {children}
        </div>
        { listOpen && (
          <ul className="dropdown-list">
            {options.map((item, index) => (
              <li
                key={index}
                className="dropdown-list__item"
                // onClick={() => changeHandler(index)}
              >
                <Link to={`/temporada${item}`}>Temporada {item}</Link>
              </li>
            ))
            //.filter((option, index) => index !== value)
            }
          </ul>
        )}
      </div>
    );
  }
}

export default DropDown;
