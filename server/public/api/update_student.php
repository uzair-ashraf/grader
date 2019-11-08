<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$studentData = getBodyData();

$studentId = intval($studentData['id']);
$studentName = addslashes($studentData['name']);
$studentNotes = addslashes($studentData['notes']);

$studentUpdateQuery = "UPDATE `students`
SET `name`= '$studentName',`notes` = '$studentNotes'
WHERE `student_id` = $studentId";

$studentUpdateResult = mysqli_query($conn, $studentUpdateQuery);

if(!$studentUpdateResult) {
  throw new Exception('There was an error updating the student'. mysqli_error($conn));
}

$response = [
  "student_id" => strval($studentId),
  "name" => $studentName,
  "notes" => $studentNotes
];

print_r(json_encode($response));

?>
