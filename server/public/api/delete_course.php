<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$courseData = getBodyData();

$courseId = intval($courseData['id']);

$startTrans = mysqli_query($conn, 'START TRANSACTION');

if(!$startTrans) {
  throw new Exception('Error starting updating database'. mysqli_error($conn));
}

$deleteCourseQuery = "DELETE FROM `courses`
WHERE `course_id`= $courseId";

$deleteCourseResult=  mysqli_query($conn, $deleteCourseQuery);

if(!$deleteCourseResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error deleting course' . mysqli_error($conn));
}

$deleteGradesQuery = "DELETE FROM `grades`
WHERE `course_id`= $courseId";

$deleteGradesResult = mysqli_query($conn, $deleteGradesQuery);

if(!$deleteGradesResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error deleting grades related to course' . mysqli_error($conn));
}

mysqli_query($conn, 'COMMIT');

$response = [
  "success" => true,
  "deleted_id" => strval($courseId)
];

print_r(json_encode($response));



?>
