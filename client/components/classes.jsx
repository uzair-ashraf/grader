import React from 'react';
import Course from './course';
import AppContext from '../lib/context';
import Header from './header';
export default class Classes extends React.Component {

  render() {
    return (
      <>
      <Header/>
      <div className="classes-page">
        <div className="page-heading">
          Your Classes
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

Classes.contextType = AppContext;
