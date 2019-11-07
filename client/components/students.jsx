import React from 'react';
import Student from './student';
import Header from './header';
import AppContext from '../lib/context';

export default class Students extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="students-page">
          <div className="page-heading">
            Your Students
          </div>
          <div className="row justify-content-center text-align-center">
            {this.context.user.students.map(student => {
              return (
                <Student
                  key={student.student_id}
                  id={student.student_id}
                  studentName={student.name}
                  notes={student.notes}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

Students.contextType = AppContext;
