import React from 'react';
import AppContext from '../lib/context';

export default class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.grade}</td>
        <td>
          <button
            onClick={() => this.context.deleteGrade(this.props.id)}
            className="btn btn-danger  mr-2">
          Delete
          </button>
          <button className="btn btn-primary">Update</button>
        </td>
      </tr>
    );
  }
}

Grade.contextType = AppContext;
