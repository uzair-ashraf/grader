import React from 'react';

export default class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.grade}</td>
        <td><button>Delete</button></td>
      </tr>
    );
  }
}
