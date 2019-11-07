import React from 'react';

export default class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.grade}</td>
        <td>
          <button className="btn btn-danger  mr-2">Delete</button>
          <button className="btn btn-primary">Update</button>
        </td>
      </tr>
    );
  }
}
