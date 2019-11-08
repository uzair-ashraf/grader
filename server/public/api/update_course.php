<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$courseData = getBodyData();

$courseName = addslashes($courseData['course_name']);
$courseId = intval($courseData['course_id']);

$courseUpdateQuery = "UPDATE `courses`
SET `course_name`= '$courseName'
WHERE `course_id` = $courseId";

$courseUpdateResult = mysqli_query($conn, $courseUpdateQuery);

if(!$courseUpdateResult) {
  throw new Exception('There was an error updating the course'. mysqli_error($conn));
}

$response = [
  "course_id" => strval($courseId),
  "course_name" => $courseName
];

print_r(json_encode($response));

?>
