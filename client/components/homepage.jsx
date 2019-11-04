import React from 'react';

export default function HomePage(props) {
  return (
    <div className="landing-page min-vh-100 row align-items-center">
      <div className="col">
        <div className="heading">
        grader.
        </div>
        <div className="subheading mt-5">
        A platform for instructors to organize their student’s grades.
        </div>
        <div className="homepage-button mt-5">
          <button className="btn btn-primary btn-lg button">login</button>
        </div>
      </div>
    </div>
  );
}
