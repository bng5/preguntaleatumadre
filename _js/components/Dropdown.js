import React, { Component } from 'react';

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
    const { options, changeHandler, value } = this.props;
    const{ listOpen, title } = this.state
console.log(options)
    return (
      <div className="dropdown-wrapper">
        <div className="dropdown-header" onClick={this.toggleList}>
          {/*<span className="dropdown-header__title">{title}</span>*/}
          { this.props.children }
        </div>
        { listOpen && (
          <ul className="dropdown-list">
            {options.map(({ value, text }, index) => (
              <li
                key={index}
                className="dropdown-list__item"
                onClick={() => changeHandler(index)}
              >
                {text}
              </li>
            ))
            .filter((option, index) => index !== value)}
          </ul>
        )}
      </div>
    );
  }
}

export default DropDown;
