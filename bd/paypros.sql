-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2023 a las 17:26:54
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paypros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `Id` int(8) NOT NULL,
  `Name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`Id`, `Name`) VALUES
(1, 'Audi'),
(2, 'BMW'),
(3, 'Chevrolet'),
(4, 'Fiat'),
(5, 'Ford'),
(6, 'Honda'),
(7, 'Hyundai'),
(8, 'Kia'),
(9, 'Mazda'),
(10, 'Mercedes-Benz'),
(11, 'Nissan'),
(12, 'Renault'),
(13, 'Subaru'),
(14, 'Toyota'),
(15, 'Volkswagen'),
(16, 'Volvo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `Id` int(8) NOT NULL,
  `Name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Style` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`Id`, `Name`, `Style`) VALUES
(1, 'Black', '#000000'),
(2, 'DarkGreen', '#006400'),
(3, 'DarkRed', '#8B0000'),
(4, 'DarkSlateGray', '#2F4F4F'),
(5, 'DarkViolet', '#9400D3'),
(6, 'DeepPink', '#FF1493'),
(7, 'DodgerBlue', '#1E90FF'),
(8, 'Gold', '#FFD700'),
(9, 'HotPink', '#FF69B4'),
(10, 'Indigo', '#4B0082'),
(11, 'LightSkyBlue', '#87CEFA'),
(12, 'Lime', '#00FF00'),
(13, 'Navy', '#000080'),
(14, 'Orange', '#FFA500'),
(15, 'OrangeRed', '#FF4500'),
(16, 'Orchid', '#DA70D6'),
(17, 'Purple', '#800080'),
(18, 'SaddleBrown', '#8B4513'),
(19, 'SeaGreen', '#2E8B57'),
(20, 'Silver', '#C0C0C0'),
(21, 'SteelBlue', '#4682B4'),
(22, 'Turquoise', '#40E0D0'),
(23, 'White', '#ffffff'),
(24, 'YellowGreen', '#9ACD32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `models`
--

CREATE TABLE `models` (
  `Id` int(8) NOT NULL,
  `Name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `models`
--

INSERT INTO `models` (`Id`, `Name`) VALUES
(1, 'Urbano'),
(2, 'Sedán'),
(3, 'Berlina'),
(4, 'Hatchback'),
(5, 'Cupé'),
(6, 'Descapotable'),
(7, 'Deportivo'),
(8, 'Todoterreno'),
(9, 'SUV'),
(10, 'Furgoneta'),
(11, 'Pickup'),
(12, 'Camioneta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parking`
--

CREATE TABLE `parking` (
  `Id` int(8) NOT NULL,
  `VehicleId` int(8) NOT NULL,
  `Floor` int(2) NOT NULL,
  `Place` int(2) NOT NULL,
  `Active` bit(1) NOT NULL,
  `EntryDate` datetime NOT NULL,
  `ExitDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `parking`
--

INSERT INTO `parking` (`Id`, `VehicleId`, `Floor`, `Place`, `Active`, `EntryDate`, `ExitDate`) VALUES
(1, 1, 1, 8, b'1', '2023-08-19 17:12:14', NULL),
(2, 2, 1, 2, b'1', '2023-08-19 17:13:04', NULL),
(3, 3, 2, 2, b'1', '2023-08-19 17:13:33', NULL),
(4, 4, 3, 1, b'1', '2023-08-19 17:14:30', NULL),
(5, 5, 3, 10, b'1', '2023-08-19 17:15:11', NULL),
(6, 6, 1, 5, b'1', '2023-08-19 17:16:06', NULL),
(7, 7, 2, 6, b'1', '2023-08-19 17:17:13', NULL),
(8, 8, 2, 1, b'0', '2023-08-19 17:17:39', '2023-08-19 17:24:19'),
(9, 9, 2, 7, b'1', '2023-08-19 17:18:08', NULL),
(10, 10, 2, 9, b'1', '2023-08-19 17:18:33', NULL),
(11, 11, 1, 6, b'1', '2023-08-19 17:19:04', NULL),
(12, 12, 2, 1, b'1', '2023-08-19 17:25:15', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicles`
--

CREATE TABLE `vehicles` (
  `Id` int(8) NOT NULL,
  `Registration` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `BrandId` int(8) NOT NULL,
  `ModelId` int(8) NOT NULL,
  `ColorId` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `vehicles`
--

INSERT INTO `vehicles` (`Id`, `Registration`, `BrandId`, `ModelId`, `ColorId`) VALUES
(1, 'SAM4458', 6, 4, 5),
(2, 'SAO4423', 11, 8, 8),
(3, 'SAP1687', 9, 3, 21),
(4, 'SAF4376', 16, 3, 19),
(5, 'SBI5531', 1, 3, 3),
(6, 'SBM8722', 14, 3, 24),
(7, 'STR9812', 4, 3, 10),
(8, 'SRR9854', 12, 3, 18),
(9, 'SOP6677', 1, 3, 6),
(10, 'SLM6633', 8, 3, 7),
(11, 'SYR1297', 1, 3, 23),
(12, 'SMM5546', 15, 2, 17);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FKVehicles` (`VehicleId`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FKBrands` (`BrandId`),
  ADD KEY `FKModels` (`ModelId`),
  ADD KEY `FKColors` (`ColorId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `models`
--
ALTER TABLE `models`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `parking`
--
ALTER TABLE `parking`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `parking`
--
ALTER TABLE `parking`
  ADD CONSTRAINT `FKVehicles` FOREIGN KEY (`VehicleId`) REFERENCES `vehicles` (`Id`);

--
-- Filtros para la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `FKBrands` FOREIGN KEY (`BrandId`) REFERENCES `brands` (`Id`),
  ADD CONSTRAINT `FKColors` FOREIGN KEY (`ColorId`) REFERENCES `colors` (`Id`),
  ADD CONSTRAINT `FKModels` FOREIGN KEY (`ModelId`) REFERENCES `models` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
