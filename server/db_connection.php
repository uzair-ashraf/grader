<?php

$conn = mysqli_connect('localhost', 'root', 'root', 'grader');
if (!$conn) {
  throw new Exception(mysqli_connect_error('Connection to database error'));
}
?>
