<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$course = intval($_GET['c_id']);
$instructor = intval($_GET['i_id']);

$gradesQuery = "SELECT G.`grade_id`, S.`name`,C.`course_name`, G.`grade`
FROM `grades` AS G
JOIN `courses` AS C
ON G.`course_id` = C.`course_id`
JOIN `students` AS S
ON G.`student_id` = S.`student_id`
WHERE G.`course_id` = $course && G.`instructor_id` = $instructor";

$gradesResult = mysqli_query($conn, $gradesQuery);

if(!$gradesResult) {
  throw new Exception('There was an error retrieving the grades '.mysqli_error($conn));
}

$grades = [];

while ($gradeRow = mysqli_fetch_assoc($gradesResult)) {
  array_push($grades, $gradeRow);
}

print_r(json_encode($grades));

?>
