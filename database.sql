
DROP DATABASE IF EXISTS test_shell_cli_nodejs;
CREATE DATABASE IF NOT EXISTS test_shell_cli_nodejs ;
USE test_shell_cli_nodejs;


DROP TABLE IF EXISTS langs;
CREATE TABLE IF NOT EXISTS langs (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  date_created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


INSERT IGNORE INTO langs (id, name, date_created) VALUES
	(1, 'php', '2017-03-02 15:04:40'),
	(2, 'python', '2017-03-02 15:10:27'),
	(3, 'nodejs', '2017-03-02 15:10:31'),
	(4, 'java', '2017-03-02 15:10:34');
