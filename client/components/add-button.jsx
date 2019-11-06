import React from 'react';
import AppContext from '../lib/context';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplayed: false
    };
  }
  render() {
    const { pathname } = this.props.location;
    if (pathname === '/' || pathname === '/login') return null;
    if (this.state.modalDisplayed) {
      if (pathname === '/classes') {
        return (
          <div className="modal-container">
            <div className="modal-background" />
            <div className="modal">
              <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })} className="fas fa-times close-modal" />
            </div>
          </div>
        );
      }
    }
    return (
      <div onClick={() => this.setState({ modalDisplayed: !this.state.modalDisplayed })}
        className="add-button">
        <i className="fas fa-plus"/>
      </div>
    );
  }
}

AddButton.contextType = AppContext;
