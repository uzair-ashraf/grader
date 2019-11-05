import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class AppDrawer extends React.Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle className="fas fa-bars button">
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <LinkContainer to="/classes">
            <Dropdown.Item id='drop-down-item'>Classes</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/students">
            <Dropdown.Item id='drop-down-item'>Students</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/">
            <Dropdown.Item id='drop-down-item'>Logout</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
