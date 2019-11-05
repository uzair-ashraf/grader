<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$instructor = $_GET['id'];

$courseQuery = "SELECT `course_id`, `course_name`
FROM `courses`
WHERE `instructor_id` = $instructor";

$studentsQuery = "SELECT `student_id`, `name`, `notes`
FROM `students`
WHERE `instructor_id` = $instructor";

$courseResult = mysqli_query($conn, $courseQuery);

if(!$courseResult) {
  throw new Exception('Error retrieving courses '. mysqli_error($conn));
}

$courses = [];

while($courseRow = mysqli_fetch_assoc($courseResult)) {
  array_push($courses, $courseRow);
}

$studentsResult = mysqli_query($conn, $studentsQuery);

if(!$studentsResult) {
  throw new Exception('Error retrieving students'. mysqli_error($conn));
}

$students = [];

while($studentRow = mysqli_fetch_assoc($studentsResult)) {
  array_push($students, $studentRow);
}

$response = [
  "instructor_id" => $instructor,
  "courses" => $courses,
  "students" => $students
];

print_r(json_encode($response));


?>
