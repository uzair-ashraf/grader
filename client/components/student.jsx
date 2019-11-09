import React from 'react';
import AppContext from '../lib/context';
import { confirmAlert } from 'react-confirm-alert';
import { Accordion, Card } from 'react-bootstrap';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.studentName,
      notes: this.props.notes
    };
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  handleStudentChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  updateStudent() {
    if (this.state.name === this.props.studentName && this.state.notes === this.props.notes) {
      this.setState({ editing: !this.state.editing });
      return;
    }
    const studentObject = {
      id: this.props.id,
      name: this.state.name,
      notes: this.state.notes
    };
    this.context.updateStudent(studentObject);
    this.setState({ editing: !this.state.editing });
  }
  handleStudentDelete(e) {
    e.stopPropagation();
    confirmAlert({
      title: 'Are you sure you want to delete this student?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.context.deleteStudent(this.props.id);
          }
        },
        {
          label: 'No'
        }
      ]
    });
  }
  render() {
    const buttons = !this.state.editing
      ? (
      <>
        <button
          onClick={() => this.setState({ editing: !this.state.editing })}
          className="btn btn-primary mr-2">
          Update
        </button>
        <button
          onClick={this.handleStudentDelete}
          className="btn btn-danger">Delete</button>
          </>
      )
      : (
      <>
        <button
          onClick={this.updateStudent}
          className="btn btn-primary mr-2">
          Update
        </button>
        <button
          onClick={() => this.setState({ editing: !this.state.editing })}
          className="btn btn-warning">Cancel</button>
          </>
      );
    const studentFields = !this.state.editing
      ? (
        {
          name: this.props.studentName,
          notes: this.props.notes
        }
      )
      : (
        {
          name: (
            <input
              type="text"
              name="name"
              className="form-control text-center"
              maxLength="62"
              id="studentName"
              value={this.state.name}
              onChange={this.handleStudentChange}
              autoComplete="off"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          ),
          notes: (
            <textarea
              className="form-control"
              name="notes"
              id="notes"
              rows="3"
              value={this.state.notes}
              onChange={this.handleStudentChange}
            />
          )
        }
      );
    return (
      <div className="col-10 mt-4">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.id}>
              <div className="student">
                {studentFields.name}
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.id}>
              <Card.Body>
                <div className="student-edit">
                  <div className="student-notes">
                    {studentFields.notes}
                  </div>
                  <div className="student-buttons mt-3">
                    {buttons}
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
