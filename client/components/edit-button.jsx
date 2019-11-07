import React from 'react';
import AppContext from '../lib/context';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false
    };
    this.courseEdit = this.courseEdit.bind(this);
  }
  courseEdit(e) {
    e.stopPropagation();
    console.log(this.props.editType);
    console.log(this.props.id);
  }
  render() {
    const buttonResponses = {
      course: this.courseEdit,
      student: null,
      grade: null
    };
    const handleClick = buttonResponses[this.props.editType];
    return (
      <div className="edit-btn" onClick={handleClick}>
        <i className="fas fa-edit" />
      </div>
    );
  }
}

EditButton.contextType = AppContext;
