import React from 'react';
import AppContext from '../lib/context';
import { Accordion, Card } from 'react-bootstrap';

export default class Student extends React.Component {

  render() {
    return (
      <div className="col-10 mt-4">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.id}>
              <div className="student">
                {this.props.studentName}
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.id}>
              <Card.Body>
                <div className="student-edit">
                  <div className="student-notes">
                    {this.props.notes}
                  </div>
                  <div className="student-buttons mt-3">
                    <button className="btn btn-primary mr-2">Update</button>
                    <button
                      onClick={() => this.context.deleteStudent(this.props.id)}
                      className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

Student.contextType = AppContext;
