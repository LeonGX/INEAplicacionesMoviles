-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2021 at 05:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `status`
--

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `IdPackage` int(20) NOT NULL,
  `numberpackage` int(20) DEFAULT NULL,
  `status` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`IdPackage`, `numberpackage`, `status`) VALUES
(1002, 2026, 1),
(1024, 2456, 1),
(1028, 2465, 1),
(1452, 9562, 1),
(1453, 1523, 1),
(1475, 1563, 1),
(1536, 5624, 1),
(1564, 1786, 1),
(1756, 4756, 1),
(1896, 4562, 1),
(4256, 7452, 1),
(5602, 4201, 1),
(5691, 4230, 1),
(6485, 5615, 1),
(6931, 8520, 1),
(7560, 7895, 1),
(7563, 7458, 1),
(7586, 4596, 1),
(7856, 9625, 1),
(8692, 1023, 1),
(9874, 6130, 1);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `IdState` int(20) NOT NULL,
  `state` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`IdState`, `state`) VALUES
(1, 'Salida de oficina'),
(2, 'Entrega a casilla'),
(3, 'Entrega a funcionario'),
(4, 'Entrega a presidente de casilla'),
(5, 'Regreso a oficina');

-- --------------------------------------------------------

--
-- Table structure for table `trackings`
--

CREATE TABLE `trackings` (
  `IdTracking` int(20) NOT NULL,
  `Id_State` int(20) DEFAULT NULL,
  `Id_Package` int(20) DEFAULT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trackings`
--

INSERT INTO `trackings` (`IdTracking`, `Id_State`, `Id_Package`, `latitud`, `longitud`) VALUES
(1, 1, 1002, '21.8825183', '-102.2501217'),
(2, 1, 1024, '21.8825183', '-102.2501217'),
(3, 1, 1028, '21.8825183', '-102.2501217'),
(4, 1, 1452, '21.8825183', '-102.2501217'),
(5, 1, 1453, '21.8825183', '-102.2501217'),
(6, 1, 1475, '21.8825183', '-102.2501217'),
(7, 1, 1536, '21.8825183', '-102.2501217'),
(8, 1, 1564, '21.8825183', '-102.2501217'),
(9, 1, 1756, '21.8825183', '-102.2501217'),
(10, 1, 1896, '21.8825183', '-102.2501217'),
(11, 1, 4256, '21.8825183', '-102.2501217'),
(12, 1, 5602, '21.8825183', '-102.2501217'),
(13, 1, 5691, '21.8825183', '-102.2501217'),
(14, 1, 6485, '21.8825183', '-102.2501217'),
(15, 1, 6931, '21.8825183', '-102.2501217'),
(16, 1, 7560, '21.8825183', '-102.2501217'),
(17, 1, 7563, '21.8825183', '-102.2501217'),
(18, 1, 7586, '21.8825183', '-102.2501217'),
(19, 1, 7856, '21.8825183', '-102.2501217'),
(20, 1, 8692, '21.8825183', '-102.2501217');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `email`, `password`) VALUES
(1, 'pepe211099@hotmail.com', '123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`IdPackage`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`IdState`);

--
-- Indexes for table `trackings`
--
ALTER TABLE `trackings`
  ADD PRIMARY KEY (`IdTracking`),
  ADD KEY `Id_State` (`Id_State`),
  ADD KEY `Id_Package` (`Id_Package`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `package`
--
ALTER TABLE `package`
  ADD CONSTRAINT `status` FOREIGN KEY (`status`) REFERENCES `states` (`IdState`);

--
-- Constraints for table `trackings`
--
ALTER TABLE `trackings`
  ADD CONSTRAINT `trackings_ibfk_1` FOREIGN KEY (`Id_State`) REFERENCES `states` (`IdState`),
  ADD CONSTRAINT `trackings_ibfk_2` FOREIGN KEY (`Id_Package`) REFERENCES `package` (`IdPackage`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
