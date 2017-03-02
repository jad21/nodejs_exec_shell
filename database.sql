-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.16-0ubuntu0.16.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para test_shell_cli_nodejs
DROP DATABASE IF EXISTS `test_shell_cli_nodejs`;
CREATE DATABASE IF NOT EXISTS `test_shell_cli_nodejs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test_shell_cli_nodejs`;

-- Volcando estructura para tabla test_shell_cli_nodejs.langs
DROP TABLE IF EXISTS `langs`;
CREATE TABLE IF NOT EXISTS `langs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla test_shell_cli_nodejs.langs: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `langs` DISABLE KEYS */;
INSERT IGNORE INTO `langs` ( `name`, `date_created`) VALUES
	('go', '2017-03-02 15:48:08'),
	('php', '2017-03-02 15:49:08'),
	('js', '2017-03-02 15:49:11'),
	('python', '2017-03-02 15:49:14'),
	('nodejs', '2017-03-02 15:49:18'),
	('ruby', '2017-03-02 15:50:05');
/*!40000 ALTER TABLE `langs` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
