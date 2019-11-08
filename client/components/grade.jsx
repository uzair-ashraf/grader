import React from 'react';
import AppContext from '../lib/context';

export default class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      grade: this.props.grade
    };
    this.handleGrade = this.handleGrade.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
  }
  handleGrade(e) {
    this.setState({ grade: e.target.value });
  }
  updateGrade(e) {
    e.preventDefault();
    if (this.state.grade === this.props.grade) {
      this.setState({ editing: !this.state.editing });
      return;
    }
    let validatedGrade = this.state.grade;
    if (this.state.grade < 0) {
      validatedGrade = 0;
    } else if (this.state.grade > 100) {
      validatedGrade = 100;
    }
    const grade = {
      id: this.props.id,
      grade: validatedGrade
    };
    this.context.updateGrade(grade);
    this.setState({ editing: !this.state.editing });
  }
  render() {
    const handleClick = e => {
      e.stopPropagation();
      this.setState({ editing: !this.state.editing });
    };
    const buttons = this.state.editing
      ? (
      <>
          <button
            type="submit"
            onClick={this.updateGrade}
            className="btn btn-primary mr-2">
            Update
          </button>
          <button
            onClick={handleClick}
            className="btn btn-warning">
            Cancel
          </button>
      </>
      )
      : (
      <>
          <button
            onClick={handleClick}
            className="btn btn-primary mr-2">
            Update
          </button>
          <button
            onClick={() => this.context.deleteGrade(this.props.id)}
            className="btn btn-danger">
            Delete
          </button>
      </>
      );
    const grade = this.state.editing
      ? (
        <form>
          <input
            type="number"
            name="grade"
            className="form-control text-center"
            max="100"
            min="0"
            maxLength="3"
            id="grade"
            value={this.state.grade}
            onChange={this.handleGrade}
            autoComplete="off"
          />
        </form>
      )
      : (
        this.props.grade
      );
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{grade}</td>
        <td>
          {buttons}
        </td>
      </tr>
    );
  }
}

Grade.contextType = AppContext;
