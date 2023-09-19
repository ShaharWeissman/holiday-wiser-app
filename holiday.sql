-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 07:21 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `holiday`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--
use holiday;

CREATE TABLE `follow` (
  `userId` int(11) NOT NULL,
  `holidayId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_name`) VALUES
(1, 'Montenegro', 'Explore picturesque landscapes and stunning coastal views', '2023-11-14', '2023-11-29', 6000.00, 'ade2cf99-1b44-47e2-9666-a0664119da96.jpg'),
(2, 'Kyoto, Japan', 'Immerse yourself in Japanese culture and historic temples', '2023-12-01', '2023-12-05', 16000.00, '49872f13-b800-4aea-89e4-b6d66eb74650.jpeg'),
(3, 'Santorini, Greece', 'Explore white-washed buildings and breathtaking sunsets', '2023-09-15', '2023-08-22', 3870.00, 'e1e23772-bde6-4347-a6e6-51e61a83fb47.jpg'),
(4, 'Cape Town, South Africa', 'Discover diverse landscapes, from Table Mountain to stunning beaches.', '2023-11-16', '2023-11-23', 8000.00, 'd478d41a-d8ff-4992-a142-0752def40588.jpg'),
(5, 'Bora Bora, French Polynesia', 'Experience overwater bungalows and stunning blue waters.', '2023-09-01', '2023-09-15', 9700.00, '2a70955f-dea8-424a-947a-c0019ee0dcf6.jpg'),
(6, 'Machu Picchu, Peru', 'Hike the Inca Trail to the ancient ruins of Machu Picchu', '2023-09-25', '2023-10-05', 4500.00, 'e9460e58-2e5d-4069-81be-5633449b729f.jpeg'),
(7, 'jordan', 'great arab country', '0124-10-29', '2023-11-01', 5000.00, '5cd8f374-f23b-4d08-a06d-101abc3b3ba2.jpeg'),
(8, 'Mauritius', 'lush green mountains, stunning beaches, and vibrant Creole culture.', '2023-09-25', '2023-10-02', 5500.00, '374d210a-a791-4e1d-953d-53ef67c77abf.jpeg'),
(9, 'Seychelles', 'Discover pristine beaches, granite boulders, and abundant wildlife', '2023-10-07', '2023-11-07', 5700.00, 'bf1a4592-9b3b-40de-8937-19cdb8bf4bf4.jpeg'),
(10, 'The Dolomites', 'The Dolomites are a mountain range in northeastern Italy. They are known for their jagged peaks, turquoise lakes, and charming villages.', '2023-12-10', '2023-12-17', 2380.00, 'no-image.jpg'),
(11, 'The Dolomites', 'The Dolomites are a mountain range in northeastern Italy. They are known for their jagged peaks, turquoise lakes, and charming villages.', '2023-12-10', '2023-12-17', 3860.00, '708166e0-86f3-4d71-be0a-b3270b1b5925.jpeg'),
(12, 'aaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaa', '2023-09-06', '2023-09-20', 123.00, '1cf8458a-8d0e-48e0-83a2-a1af2bc2cb5a.jpg'),
(13, 'bbbbbbbbb', 'abbbbbbbbbbbbb', '2023-02-12', '2023-09-25', 1500.00, 'd90bc408-0b8a-429f-93c6-0b2b38ffc568.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(40) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
(3, 'Elvis', 'Presley', 'elvis@example.com', 'rocknroll123', NULL),
(4, 'jay-z', 'zendelovitch', 'jay@zi', 'jay@zi', NULL),
(5, 'jay-z1', 'zendelovitch1', 'sw@admin', 'sw@admin', 'admin'),
(6, 'aaaaaaa', 'aaaaaaaaaaaaaa', 'aaa@aaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaa', 'user'),
(7, 'admin', 'shaharAdmin', 'admin@gmail.com', 'admin', 'admin'),
(8, 'user', 'user', 'user@gmail.com', 'user', 'user'),
(9, 'michal', 'jordan', 'jordan@gmail.com', 'e26a1f8262097d12c2dc27967d7b31ed0b921ba1241e5ea69f', 'user'),
(10, 'yossi', 'yossi', 'yossi@gmail.com', 'yossi', 'user'),
(11, 'KKKK', 'KKKK', 'KKKK@KKKK', '$2b$08$u/xIUgApVKmwZSnG20GOC.8gzAEK3TNOkWwiTEOHS3h', 'user'),
(12, 'user1', 'user1', 'user1@gmail.com', '$2b$08$0BC6UwGRBLBY8/MD7KZqgOQ.2zLM/OyFKcefIJCs0PL', 'user'),
(13, 'user2', 'user2', 'user2@gmail.com', '$2b$08$reBYaIjf9ij6e0Im05j8Ue08LHjQP0L8k0vHzPZYNOg', 'user'),
(14, 'user3', 'user3', 'user3@gmai.com', '$2b$08$nPasHd2GzCqZAXtWowV3/eatXLBFL4pDv849AjFX9rb', 'user'),
(15, 'messi', 'lioenl', 'messi@gmail.com', 'messi', 'user'),
(16, 'asaf', 'lotz', 'asaf@gmail.com', '$2b$10$dFaNXoOS9hkIWv.utfuAGO6gSCGTPj.x.7jDu64.qbz', 'user'),
(17, 'oshrat', 'oshrat', 'oshrat@gmail.com', '$2b$10$RD7hMUuTEyC5yh4.2sDC3.TnQhWSpQWMJyIIzk0L/dC', 'user'),
(18, 'jay-z1', 'zendelovitch1', 'jay@zi1', '$2b$08$y89qZOfKmVMRkwczmIP0tuDiYvYP6qKVdP7MpfbR7hA', 'user'),
(19, 'test02', 'test02', 'test02@test.ts', '$2b$08$6jr6R.4mrDOHTAzWpCKHDuIV/Z0Wy1FzB7UgzE/JUXk', 'user'),
(20, 'Jimi', 'Hendrix', 'Jimi@gmail.com', 'Jimi@gmail.com', 'user'),
(21, 'test', 'test', 'test@test1', 'test', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`userId`,`holidayId`),
  ADD KEY `holidayId` (`holidayId`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`holidayId`) REFERENCES `holidays` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
