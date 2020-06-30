DROP TABLE IF EXISTS `certificates`;

CREATE TABLE `certificates` (
  `domain` varchar(40) DEFAULT NULL,
  `certification_id` int(11) NOT NULL AUTO_INCREMENT,
  `certification` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT 'ADMIN',
  PRIMARY KEY (`certification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8000 DEFAULT CHARSET=latin1;