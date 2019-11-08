<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$studentData = getBodyData();

$studentId = intval($studentData['id']);

$startTrans = mysqli_query($conn, 'START TRANSACTION');

if(!$startTrans) {
  throw new Exception('Error starting updating database'. mysqli_error($conn));
}

$deleteStudentQuery = "DELETE FROM `students`
WHERE `student_id`= $studentId";

$deleteStudentResult=  mysqli_query($conn, $deleteStudentQuery);

if(!$deleteStudentResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error deleting student' . mysqli_error($conn));
}

$deleteGradesQuery = "DELETE FROM `grades`
WHERE `student_id`= $studentId";

$deleteGradesResult = mysqli_query($conn, $deleteGradesQuery);

if(!$deleteGradesResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error deleting grades related to student' . mysqli_error($conn));
}

mysqli_query($conn, 'COMMIT');

$response = [
  "success" => true,
  "deleted_id" => strval($studentId)
];

print_r(json_encode($response));
