DROP TABLE IF EXISTS `designation`;

CREATE TABLE `designation` (
  `designation_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(50) DEFAULT NULL,
  `current_role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`designation_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50001 DEFAULT CHARSET=latin1;