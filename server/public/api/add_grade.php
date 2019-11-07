<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$gradeData = getBodyData();

$studentId = intval($gradeData['student']);
$grade = intval($gradeData['grade']);
$instructorId = intval($gradeData['instructor_id']);
$courseId = intval($gradeData['course_id']);


$gradeQuery = "INSERT INTO `grades`(`student_id`, `course_id`, `instructor_id`, `grade`)
VALUES ($studentId, $courseId, $instructorId, $grade)";

$gradeResult = mysqli_query($conn, $gradeQuery);

if(!$gradeResult) {
  throw new Exception('There was an error adding a grade to the db '. mysqli_error($conn));
}
$grade_id = mysqli_insert_id($conn);

$totalGradesQuery = "SELECT G.`grade_id`, S.`name`, S.`student_id`,C.`course_name`,C.`course_id`, G.`grade`
FROM `grades` AS G
JOIN `courses` AS C
ON G.`course_id` = C.`course_id`
JOIN `students` AS S
ON G.`student_id` = S.`student_id`
WHERE G.`grade_id` = $grade_id";

$totalGradesResult = mysqli_query($conn, $totalGradesQuery);

if (!$totalGradesResult) {
  throw new Exception('There was an error retrieving new grade data' . mysqli_error($conn));
}

print_r(json_encode(mysqli_fetch_assoc($totalGradesResult)));

?>
