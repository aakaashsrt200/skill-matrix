DROP TABLE IF EXISTS `education`;

CREATE TABLE `education` (
  `education_id` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(100) DEFAULT NULL,
  `stream` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`education_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60001 DEFAULT CHARSET=latin1;