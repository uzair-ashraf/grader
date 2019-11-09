-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2019 at 10:38 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grader`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `course_name` varchar(62) NOT NULL,
  `instructor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `instructor_id`) VALUES
(4, 'intro to php', 2),
(5, 'art', 2),
(7, 'Why node is bad', 2),
(8, 'Data Structures', 2),
(10, 'Intro to HTML5', 1),
(11, 'Intro to CSS', 1),
(12, 'Intro to PHP', 1),
(13, 'Intro to MySQL', 1);

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `grade_id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `instructor_id` int(10) UNSIGNED NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`grade_id`, `student_id`, `course_id`, `instructor_id`, `grade`) VALUES
(7, 5, 4, 2, 78),
(8, 4, 4, 2, 92),
(9, 4, 5, 2, 85),
(10, 5, 5, 2, 22),
(21, 11, 9, 1, 10),
(23, 4, 7, 2, 100),
(25, 2, 10, 1, 68),
(26, 2, 11, 1, 100),
(27, 12, 12, 1, 100),
(28, 6, 10, 1, 100),
(29, 12, 13, 1, 100),
(30, 2, 13, 1, 85),
(32, 11, 12, 1, 100),
(33, 13, 10, 1, 99),
(34, 14, 10, 1, 100),
(35, 6, 11, 1, 100),
(36, 13, 11, 1, 95);

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `instructor_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(62) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructor_id`, `username`) VALUES
(2, 'dantheman'),
(1, 'timmydee');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `instructor_id` int(10) UNSIGNED NOT NULL,
  `notes` text CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `instructor_id`, `notes`) VALUES
(2, 'michael chang', 1, 'part of 819 and 919, heavy hitter, also lowkey my boi'),
(3, 'tarun padath', 1, 'eats a banana every day'),
(4, 'mitch ohair', 2, 'has a cs degree, solid worker'),
(5, 'uzair ashraf', 2, 'laughs way too much, needs to sit close'),
(6, 'Edward Lee', 1, 'Great coder, really knows backend'),
(9, 'Blake Ros', 2, ''),
(11, 'James Cho', 1, 'doesnt wanna work upstairs'),
(12, 'Uzair Ashraf', 1, 'Usually late, falls asleep at his desk.'),
(13, 'Kevin Akahoshi', 1, 'is nihonjin'),
(14, 'Wenhao Wang', 1, 'Spelled Wang, pronounced wong');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructor_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `grade_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
