<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$gradeData = getBodyData();

$grade = intval($gradeData['grade']);
$gradeId = intval($gradeData['id']);

$gradeUpdateQuery = "UPDATE `grades`
SET `grade`= $grade
WHERE `grade_id` = $gradeId";

$gradeUpdateResult = mysqli_query($conn, $gradeUpdateQuery);

if(!$gradeUpdateResult) {
  throw new Exception('There was an error updating the grade'. mysqli_error($conn));
}

$response = [
  "grade_id" => strval($gradeId),
  "grade" => $grade
];

print_r(json_encode($response));

?>
