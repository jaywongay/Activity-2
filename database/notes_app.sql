-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2025 at 12:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT 'default'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `userId`, `color`) VALUES
(16, 'ytyytyy', 'tyhyuyhb', '2025-10-12 03:22:55.815629', '2025-10-12 03:22:55.815629', 10, 'default'),
(17, 'ayokonamenAntoknako', 'MAKIKITA KO NA SI JESUS', '2025-10-12 03:23:27.571305', '2025-10-12 06:36:38.000000', 10, 'default'),
(18, 'note 1', 'gusto ko na matlog, pero ang dami ko pang aayusin sa code. LORD HELP', '2025-10-12 04:31:30.837530', '2025-10-12 04:31:30.837530', 11, 'default');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `resetPasswordToken`, `resetPasswordExpires`) VALUES
(8, 'newuser', 'newuser@test.com', '$2b$10$jUDPdl3d79fQyPV2.YmanOb1EULc0T5qNMhRy5WOVqtrVRYV8d6s.', '2025-10-04 20:08:17.878471', '2025-10-04 20:08:17.878471', NULL, NULL),
(10, 'hon123', 'snghn.magdrigal@gmail.com', '$2b$10$Ub3Wco/Xbu6Y.TDkKCCu/.U/j79.JSp2s5TmuPufs1djEaT3v9iMO', '2025-10-12 01:29:41.300054', '2025-10-12 06:33:11.000000', '927c46f76b4e2710634588a961022bb51966f68eea0ddd22deb6090de63d6805', '2025-10-12 07:33:11'),
(11, 'ayet', 'theadc24@gmail.com', '$2b$10$iqjUhGVM88hQ1OomKRB/Y.8FxTd5n.ervtKc8XTy.cZBrVpH3nkc.', '2025-10-12 04:21:02.353687', '2025-10-12 05:21:24.000000', 'c9590ff6f8c1823b22e08f399d772c6e74297b3aadbe62fd17ddeb1c4ab90b8f', '2025-10-12 06:21:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5b87d9d19127bd5d92026017a7b` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `FK_5b87d9d19127bd5d92026017a7b` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
