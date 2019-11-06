import React from 'react';
import AppContext from '../lib/context';
import Header from './header';
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
    return (
      <>
        <Header />
        <div className="grades-page">
          <div className="page-heading">
            Grades
          </div>
          <div className="row justify-content-center text-align-center">
            here are ya grades buckeroo
          </div>
        </div>
      </>
    );
  }
}

GradeTable.contextType = AppContext;
