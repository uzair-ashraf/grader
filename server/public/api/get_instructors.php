<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$instructorsQuery = "SELECT * FROM `instructors`";

$instructorsResult = mysqli_query($conn, $instructorsQuery);

if(!$instructorsResult) {
  throw new Exception('There was an error retrieving instructors data'. mysqli_error($conn));
}

$instructors = [];
while($row = mysqli_fetch_assoc($instructorsResult)) {
  array_push($instructors, $row);
}

print_r(json_encode($instructors));

?>
