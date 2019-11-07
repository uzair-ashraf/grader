import React from 'react';
import AppContext from '../lib/context';
import Header from './header';
import Grade from './grade';

export default class GradeTable extends React.Component {
  componentDidMount() {
    const { courseId } = this.props.match.params;
    this.context.getGrades(courseId);
  }

  render() {
    if (!this.context.currentGrades) {
      return 'Loading Grades...';
    }
    const gradesHeading = this.context.currentGrades.length
      ? this.context.currentGrades[0].course_name
      : 'Grades';
    return (
      <>
        <Header />
        <div className="grades-page">
          <div className="page-heading">
            {gradesHeading}
          </div>
          <div className="row justify-content-center text-center">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              <tbody>
                {this.context.currentGrades.map(grade => {
                  return (<Grade
                    key={grade.grade_id}
                    id={grade.grade_id}
                    name={grade.name}
                    grade={grade.grade}
                  />
                  );
                })
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

GradeTable.contextType = AppContext;
