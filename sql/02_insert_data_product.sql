-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 03 nov. 2023 à 17:47
-- Version du serveur : 5.7.33
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `products`
--
USE products;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '''',
  `likes` int(11) NOT NULL DEFAULT '0',
  `price` float NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `title`, `image`, `likes`, `price`, `description`) VALUES
(8, 'Pomme', 'https://www.academiedugout.fr/images/17157/1200-auto/pomme_000.jpg?poix=50&poiy=50', 0, 12, 'Ceci est une pomme'),
(9, 'Framboise', 'https://www.jaimefruitsetlegumes.ca/wp-content/uploads/2019/09/framboises-scaled-e1644263837892.jpg', 0, 5, 'Ceci est une framboise'),
(10, 'Orange', 'https://www.poder.fr/wp-content/uploads/2018/04/shutterstock_342874121-1200x876.jpg', 0, 6, 'Ceci est une orange'),
(11, 'Poire', 'https://www.academiedugout.fr/images/17155/370-274/ffffff/poire_000.jpg?poix=50&poiy=50', 0, 20, 'Ceci est une poire');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
