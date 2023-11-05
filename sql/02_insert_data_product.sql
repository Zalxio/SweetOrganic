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
(8, 'Bonbon à la pomme', 'https://www.candybulle.com/wp-content/uploads/2020/06/pomme-citrique.jpg', 2, 12, 'Ceci est un bonbon à la pomme'),
(9, 'Bonbon à la fraise', 'https://www.vracfacile.fr/1660-large_default/bonbon-fraise-bio-100-gr.jpg', 33, 5, 'Ceci est un bonbon à la fraise'),
(10, 'Bonbon goût orange', 'https://i.etsystatic.com/33146936/r/il/53ef80/3778782943/il_794xN.3778782943_7zf6.jpg', 5, 6, 'Ceci est un bobon goût orange'),
(11, 'Bobon à la poire', 'https://www.lesfleurons-apt.com/2194-large_default/pate-de-fruit-poire-90gr.jpg', 10, 20, 'Ceci est un bonbon à la poire');

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
