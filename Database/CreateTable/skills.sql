DROP TABLE IF EXISTS `skills`;

CREATE TABLE `skills` (
  `domain` varchar(40) NOT NULL,
  `skill_id` int(11) NOT NULL AUTO_INCREMENT,
  `skill` varchar(50) NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30001 DEFAULT CHARSET=latin1;