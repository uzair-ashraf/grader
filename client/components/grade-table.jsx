import React from 'react';
import AppContext from '../lib/context';
import axios from 'axios';

export default class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: null
    };
  }
  componentDidMount() {
    axios.get();
  }

  render() {
    return (
      <>
        <Header />
        <div className="grades-page">
          <div className="page-heading">
            Grades
          </div>
          <div className="row justify-content-center text-align-center">
            {this.context.user.courses.map(course => {
              return (
                <Course
                  key={course.course_id}
                  id={course.course_id}
                  courseName={course.course_name}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

GradeTable.contextType = AppContext;
