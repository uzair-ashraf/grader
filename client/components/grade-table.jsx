import React from 'react';
import AppContext from '../lib/context';
import Header from './header';
import Grade from './grade';
import axios from 'axios';

export default class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: null
    };
  }
  componentDidMount() {
    const { instructor_id } = this.context.user;
    const { courseId } = this.props.match.params;
    axios.get(`/api/get_grades.php?c_id=${courseId}&i_id=${instructor_id}`)
      .then(response => this.setState({ grades: response.data }));
  }

  render() {
    if (!this.state.grades) {
      return 'Loading Grades...';
    }
    const gradesHeading = this.state.grades.length
      ? this.state.grades[0].course_name
      : 'Grades';
    return (
      <>
        <Header />
        <div className="grades-page">
          <div className="page-heading">
            {gradesHeading}
          </div>
          <div className="row justify-content-center text-align-center">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              <tbody>
                {this.state.grades.map(grade => {
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
