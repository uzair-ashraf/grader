<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$studentData = getBodyData();

$studentName = addslashes($studentData['name']);
$studentNotes = addslashes($studentData['notes']);
$instructorId = intval($studentData['instructor_id']);

$insertStudentQuery = "INSERT INTO `students`(`name`, `instructor_id`, `notes`)
VALUES ('$studentName',$instructorId,'$studentNotes')";

$insertStudentResult = mysqli_query($conn, $insertStudentQuery);

if(!$insertStudentResult) {
  throw new Exception('There was an error adding the course to your database'. mysqli_error($conn));
}

$student_id = mysqli_insert_id($conn);

$response = [
  "student_id" => $student_id,
  "name" => $studentName,
  "notes" => $studentNotes
];

print_r(json_encode($response));



?>
