DROP TABLE IF EXISTS `practices`;

CREATE TABLE `practices` (
  `practice` varchar(4) NOT NULL,
  `coe_id` int(11) NOT NULL AUTO_INCREMENT,
  `coe` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`coe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;