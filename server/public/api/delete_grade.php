<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$gradeData = getBodyData();

$gradeId = intval($gradeData['id']);

$deleteQuery = "DELETE FROM `grades`
WHERE `grade_id`= $gradeId";

$deleteResult = mysqli_query($conn, $deleteQuery);

if(!$deleteResult) {
  throw new Exception('There was an error deleting the grade'. mysqli_error($conn));
}

if(mysqli_affected_rows($conn) < 0) {
  throw new Exception('The grade was not effected in the database');
}

$response = [
  "success"=> true,
  "deleted_id"=> strval($gradeId)
];

print_r(json_encode($response));



?>
