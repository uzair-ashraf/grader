<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$courseData = getBodyData();

$courseName = addslashes($courseData['name']);
$instructorId = intval($courseData['instructor_id']);

$insertCourseQuery = "INSERT INTO `courses`(`course_name`, `instructor_id`)
VALUES ('$courseName', $instructorId)";

$insertCourseResult = mysqli_query($conn, $insertCourseQuery);

if(!$insertCourseResult) {
  throw new Exception('There was an error adding the course to your database'. mysqli_error($conn));
}

$course_id = mysqli_insert_id($conn);

$response = [
  "course_id" => $course_id,
  "course_name" => $courseName
];

print_r(json_encode($response));



?>
